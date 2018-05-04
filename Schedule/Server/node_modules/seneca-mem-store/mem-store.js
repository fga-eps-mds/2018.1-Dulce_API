/* Copyright (c) 2010-2017 Richard Rodger and other contributors, MIT License */
'use strict'

var _ = require('lodash')

var internals = {
  name: 'mem-store'
}

module.exports = mem_store
Object.defineProperty(module.exports, 'name', {value: 'mem-store'})

function mem_store (options) {
  var seneca = this

  // merge default options with any provided by the caller
  options = seneca.util.deepextend({
    prefix: '/mem-store',
    web: {
      dump: false
    },

    // TODO: use seneca.export once it allows for null values
    generate_id: seneca.root.private$.exports['entity/generate_id']
  }, options)

  // The calling Seneca instance will provide
  // a description for us on init(), it will
  // be used in the logs
  var desc

  // Our super awesome in mem database. Please bear in mind
  // that this store is meant for fast prototyping, using
  // it for production is not advised!
  var entmap = {}

  // Define the store using a description object.
  // This is a convenience provided by seneca.store.init function.
  var store = {

    // The name of the plugin, this is what is the name you would
    // use in seneca.use(), eg seneca.use('mem-store').
    name: internals.name,

    save: function (msg, done) {
      // Take a reference to Seneca
      // and the entity to save
      var seneca = this
      var ent = msg.ent

      // create our cannon and take a copy of
      // the zone, base and name, we will use
      // this info further down.
      var canon = ent.canon$({object: true})
      var zone = canon.zone
      var base = canon.base
      var name = canon.name

      // check if we are in create mode,
      // if we are do a create, otherwise
      // we will do a save instead
      var create = ent.id == null
      if (create) {
        create_new()
      }
      else {
        do_save()
      }

      // The actual save logic for saving or
      // creating and then saving the entity.
      function do_save (id, isnew) {
        var mement = ent.data$(true, 'string')

        if (undefined !== id) {
          mement.id = id
        }

        mement.entity$ = ent.entity$

        entmap[base] = entmap[base] || {}
        entmap[base][name] = entmap[base][name] || {}

        var prev = entmap[base][name][mement.id]
        if (isnew && prev) {
          return done(new Error('Entity of type ' + ent.entity$ + ' with id = ' + id + ' already exists.'))
        }

        var shouldMerge = true
        if (options.merge !== false && ent.merge$ === false) {
          shouldMerge = false
        }
        if (options.merge === false && ent.merge$ !== true) {
          shouldMerge = false
        }

        mement = _.cloneDeep(mement)
        if (shouldMerge) {
          mement = _.assign(prev || {}, mement)
        }
        prev = entmap[base][name][mement.id] = mement

        seneca.log.debug(function () {
          return ['save/' + (create ? 'insert' : 'update'), ent.canon$({string: 1}), mement, desc]
        })

        done(null, ent.make$(prev))
      }

      // We will still use do_save to save the entity but
      // we need a place to handle new entites and id concerns.
      function create_new () {
        var id

        // Check if we already have an id or if
        // we need to generate a new one.
        if (undefined !== ent.id$) {
          // Take a copy of the existing id and
          // delete it from the ent object. Do
          // save will handle the id for us.
          id = ent.id$
          delete ent.id$

          // Save with the existing id
          return do_save(id, true)
        }

        // Generate a new id
        id = options.generate_id ? options.generate_id() : void 0

        if (undefined !== id) {
          return do_save(id, true)
        }
        else {
          var gen_id = {
            role: 'basic',
            cmd: 'generate_id',
            name: name,
            base: base,
            zone: zone
          }

          // When we get a respones we will use the id param
          // as our entity id, if this fails we just fail and
          // call done() as we have no way to save without an id
          seneca.act(gen_id, function (err, id) {
            if (err) return done(err)
            do_save(id, true)
          })
        }
      }
    },

    load: function (msg, done) {
      var qent = msg.qent
      var q = msg.q

      listents(this, entmap, qent, q, function (err, list) {
        var ent = list[0] || null

        this.log.debug(function () {
          return [ 'load', q, qent.canon$({string: 1}), ent, desc ]
        })

        done(err, ent)
      })
    },

    list: function (msg, done) {
      var qent = msg.qent
      var q = msg.q

      listents(this, entmap, qent, q, function (err, list) {
        this.log.debug(function () {
          return ['list', q, qent.canon$({string: 1}), list.length, list[0], desc]
        })

        done(err, list)
      })
    },

    remove: function (msg, done) {
      var seneca = this
      var qent = msg.qent
      var q = msg.q
      var all = q.all$

      // default false
      var load = q.load$ === true

      listents(seneca, entmap, qent, q, function (err, list) {
        if (err) {
          return done(err)
        }

        list = list || []
        list = all ? list : list.slice(0, 1)

        list.forEach(function (ent) {
          var canon = qent.canon$({
            object: true
          })

          delete entmap[canon.base][canon.name][ent.id]

          seneca.log.debug(function () {
            return ['remove/' + (all ? 'all' : 'one'), q, qent.canon$({string: 1}), ent, desc]
          })
        })

        var ent = !all && load && list[0] || null

        done(null, ent)
      })
    },

    close: function (msg, done) {
      this.log.debug('close', desc)
      done()
    },

    // .native() is used to handle calls to the underlying driver. Since
    // there is no underlying driver for mem-store we simply return the
    // default entityMap object.
    native: function (msg, done) {
      done(null, entmap)
    }
  }

  // Init the store using the seneca instance, merged
  // options and the store description object above.
  var meta = seneca.store.init(seneca, options, store)

  // int() returns some metadata for us, one of these is the
  // description, we'll take a copy of that here.
  desc = meta.desc

  options.idlen = options.idlen || 6

  seneca.add({role: store.name, cmd: 'dump'}, function (msg, done) {
    done(null, entmap)
  })

  seneca.add({role: store.name, cmd: 'export'}, function (msg, done) {
    var entjson = JSON.stringify(entmap)

    done(null, {json: entjson})
  })

  seneca.add({role: store.name, cmd: 'import'}, function (msg, done) {
    try {
      entmap = JSON.parse(msg.json)
      done()
    }
    catch (e) {
      done(e)
    }
  })

  // Seneca will call init:plugin-name for us. This makes
  // this action a great place to do any setup.
  seneca.add('init:mem-store', function (msg, done) {
    if (options.web.dump) {
      seneca.act('role:web', {
        use: {
          prefix: options.prefix,
          pin: {role: 'mem-store', cmd: '*'},
          map: {dump: true}
        }
      })
    }

    return done()
  })

  // We don't return the store itself, it will self load into Seneca via the
  // init() function. Instead we return a simple object with the stores name
  // and generated meta tag.
  return {
    name: store.name,
    tag: meta.tag,
    exportmap: {
      native: entmap
    }
  }
}

module.exports.preload = function () {
  var seneca = this

  var meta = {
    name: internals.name,
    exportmap: {
      native: function () {
        seneca.export(internals.name + '/native').apply(this, arguments)
      }
    }
  }

  return meta
}

// Seneca supports a reasonable set of features
// in terms of listing. This function can handle
// sorting, skiping, limiting and general retrieval.
function listents (seneca, entmap, qent, q, done) {
  var list = []

  var canon = qent.canon$({object: true})
  var base = canon.base
  var name = canon.name

  var entset = entmap[base] ? entmap[base][name] : null

  if (entset) {
    if (_.isString(q)) {
      var ent = entset[q]
      if (ent) {
        list.push(ent)
      }
    }
    if (_.isArray(q)) {
      _.each(q, function (id) {
        var ent = entset[id]
        if (ent) {
          ent = qent.make$(ent)
          list.push(ent)
        }
      })
    }
    if (_.isObject(q)) {
      _.keys(entset).forEach(function (id) {
        var ent = entset[id]
        for (var p in q) {
          if (!~p.indexOf('$') && q[p] !== ent[p]) {
            return
          }
        }
        ent = qent.make$(ent)
        list.push(ent)
      })
    }
  }

  // Always sort first, this is the 'expected' behaviour.
  if (q.sort$) {
    for (var sf in q.sort$) {
      break
    }

    var sd = q.sort$[sf] < 0 ? -1 : 1
    list = list.sort(function (a, b) {
      return sd * (a[sf] < b[sf] ? -1 : a[sf] === b[sf] ? 0 : 1)
    })
  }

  // Skip before limiting.
  if (q.skip$ && q.skip$ > 0) {
    list = list.slice(q.skip$)
  }

  // Limited the possibly sorted and skipped list.
  if (q.limit$ && q.limit$ >= 0) {
    list = list.slice(0, q.limit$)
  }

  // Return the resulting list to the caller.
  done.call(seneca, null, list)
}

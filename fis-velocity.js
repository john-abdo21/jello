var fis = module.exports = require('fis');

fis.cli.name = 'fis-velocity';
fis.cli.info = fis.util.readJSON(__dirname + '/package.json');

fis.config.merge({
    statics: '/static',

    server: {
        rewrite: true,
        libs: 'velocity',

        clean: {
            exclude: "WEB-INF**"
        }
    },

    modules : {

        parser : {
            less: 'less',
            sass: 'sass',
            scss: 'sass',
            po: 'po'
        },

        preprocessor: {
            tpl: 'extVelocity'
        },

        postprocessor: {
            tpl: 'require-async',
            js: 'jswrapper, require-async'
        },

        optimizer : {
            tpl : 'html-compress'
        }
    },

    roadmap : {
        ext : {
            less : 'css',
            tmpl : 'js',
            po   : 'json'
        },

        path : [

            {
                reg : /^\/widget\/(.*\.vm)$/i,
                isMod : true,
                url : '${namespace}/widget/$1',
                release : '/templates/${namespace}/widget/$1'
            },

            {
                reg : /^\/widget\/(.*\.(js|css))$/i,
                isMod : true,
                release : '${statics}/${namespace}/widget/$1'
            },

            {
                reg : /^\/page\/(.+\.vm)$/i,
                isMod: true,
                release : '/templates/${namespace}/page/$1',
                extras: {
                    isPage: true
                }
            },

            {
                reg: /^\/(static)\/(.*)/i,
                release: '${statics}/${namespace}/$2'
            },

            {
                reg: /^\/(config|test)\/(.*)/i,
                isMod: false,
                release: '/$1/${namespace}/$2'
            },

            {
                reg: "build.sh",
                release: false
            },

            {
                reg : '${namespace}-map.json',
                release : '/WEB-INF/config/${namespace}-map.json'
            },

            {
                reg: /^.+$/,
                release: '${statics}/${namespace}$&'
            }
        ]
    },

    settings : {
        postprocessor : {
            jswrapper: {
                type: 'amd'
            }
        }
    }
});
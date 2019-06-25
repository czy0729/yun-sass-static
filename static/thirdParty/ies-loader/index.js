function IES() {
  var __ies = this
  __ies.target = null // 场景容器
  __ies.ctrl = null // 控制面板容器
  __ies.iesLinks = {} // ies数据地址
  __ies.config = {
    // 默认值
    ies: '', // ies
    ambientLight: 50, // 环境光照量
    light: 2500, // 光通量
    cct: 6500 // 色温
  }
  __ies.renderer = null // 用于清除Three实例

  // 销毁实例
  this.destory = function() {
    __ies.target = null
    __ies.ctrl = null
    __ies.iesLinks = null
    __ies.config = null
    if (__ies.renderer) {
      __ies.renderer.forceContextLoss()
      __ies.renderer.context = null
      __ies.renderer.domElement = null
      __ies.renderer = null
    }
    __ies = null
  }

  // 初始化实例
  this.init = function(config) {
    !(function() {
      var style = document.createElement('style')
      style.type = 'text/css'
      style.innerHTML =
        ".ies-loader__container>canvas{display:block;position:absolute;top:0;right:0;bottom:0;left:0;width:100%!important;height:100%!important}.ies-loader__ctrl{position:absolute;right:0;top:0;bottom:0;width:240px}.ies-loader__ctrl .dg.main{margin-right:0;background:rgba(225,225,225,0.15);position:absolute;height:100%;padding:10px 10px 10px 20px;box-sizing:border-box}.ies-loader__ctrl .dg .main.a{margin-right:0;background:black}.ies-loader__ctrl .dg.main>div:first-child{display:none}.ies-loader__ctrl .close-button{display:none}.ies-loader__ctrl .dg li:not(.folder){cursor:auto;height:22px;line-height:22px;padding:0;border:0;background-color:transparent}.ies-loader__ctrl .dg li.folder{padding:0 0 0 20px;border:0;margin:5px 0 5px -20px}.ies-loader__ctrl .dg li.title{margin-left:-20px;padding-left:20px;background-position:7px 7px}.ies-loader__ctrl .dg .c input[type='text']{background:transparent;line-height:14px;height:14px;margin-top:1px}.ies-loader__ctrl .dg .c .slider{height:8px;margin-top:7px;background:rgba(0,0,0,0.35)}.ies-loader__ctrl .dg .c input[type='checkbox']{margin:4px 0 0 -5px;width:30px;height:14px;border:0;-webkit-appearance:none;-moz-appearance:none;-ms-appearance:none;-o-appearance:none;appearance:none;position:relative;transition:all .3s ease-out 0;background:rgba(255,255,255,0.5);cursor:pointer;display:inline-block;outline:none!important;box-shadow:none;border-radius:1000px}.ies-loader__ctrl .dg .c input[type='checkbox']:before{content:'';position:absolute;width:10px;height:10px;background-color:#fff;border-radius:1000px;top:2px;left:2px;transition:all .3s ease-out 0}.ies-loader__ctrl .dg .c input[type='checkbox']:checked{background-color:#38f;transition:all .3s ease-out 0}.ies-loader__ctrl .dg .c input[type='checkbox']:checked:before{left:auto;right:2px;transition:all .3s ease-out 0}.ies-loader__ctrl .dg .c select{margin:1px 0 0 -5px}.ies-loader__ctrl .dg .cr.function{padding-left:40%}.ies-loader__ctrl .dg .cr.function .property-name{margin-left:-5px}.ies-loader__ctrl .dg .cr.function:hover,.ies-loader__ctrl .dg .cr.boolean:hover{background:0}"
      document
        .getElementsByTagName('HEAD')
        .item(0)
        .appendChild(style)
    })()

    if (config) {
      __ies.target = config.target
      __ies.ctrl = config.ctrl
      __ies.iesLinks = config.iesLinks || {}
      if (config.config) {
        __ies.config.ies = config.config.ies
        __ies.config.ambientLight = config.config.ambientLight || 50
        __ies.config.light = config.config.light || 2500
        __ies.config.cct = config.config.cct || 6500
      }
    }

    // "https://cdn.bootcss.com/device.js/0.2.7/device.min.js"
    // console.log('@@@@1 device.js 0.2.7')
    !function() {
      // console.log('@@@@1-1')
      var a, b, c, d, e, f, g, h, i, j
      ;(b = window.device),
        (a = {}),
        (window.device = a),
        (d = window.document.documentElement),
        (j = window.navigator.userAgent.toLowerCase()),
        (a.ios = function() {
          return a.iphone() || a.ipod() || a.ipad()
        }),
        (a.iphone = function() {
          return !a.windows() && e('iphone')
        }),
        (a.ipod = function() {
          return e('ipod')
        }),
        (a.ipad = function() {
          return e('ipad')
        }),
        (a.android = function() {
          return !a.windows() && e('android')
        }),
        (a.androidPhone = function() {
          return a.android() && e('mobile')
        }),
        (a.androidTablet = function() {
          return a.android() && !e('mobile')
        }),
        (a.blackberry = function() {
          return e('blackberry') || e('bb10') || e('rim')
        }),
        (a.blackberryPhone = function() {
          return a.blackberry() && !e('tablet')
        }),
        (a.blackberryTablet = function() {
          return a.blackberry() && e('tablet')
        }),
        (a.windows = function() {
          return e('windows')
        }),
        (a.windowsPhone = function() {
          return a.windows() && e('phone')
        }),
        (a.windowsTablet = function() {
          return a.windows() && e('touch') && !a.windowsPhone()
        }),
        (a.fxos = function() {
          return (e('(mobile;') || e('(tablet;')) && e('; rv:')
        }),
        (a.fxosPhone = function() {
          return a.fxos() && e('mobile')
        }),
        (a.fxosTablet = function() {
          return a.fxos() && e('tablet')
        }),
        (a.meego = function() {
          return e('meego')
        }),
        (a.cordova = function() {
          return window.cordova && 'file:' === location.protocol
        }),
        (a.nodeWebkit = function() {
          return 'object' == typeof window.process
        }),
        (a.mobile = function() {
          return (
            a.androidPhone() ||
            a.iphone() ||
            a.ipod() ||
            a.windowsPhone() ||
            a.blackberryPhone() ||
            a.fxosPhone() ||
            a.meego()
          )
        }),
        (a.tablet = function() {
          return (
            a.ipad() ||
            a.androidTablet() ||
            a.blackberryTablet() ||
            a.windowsTablet() ||
            a.fxosTablet()
          )
        }),
        (a.desktop = function() {
          return !a.tablet() && !a.mobile()
        }),
        (a.television = function() {
          var a
          for (
            television = [
              'googletv',
              'viera',
              'smarttv',
              'internet.tv',
              'netcast',
              'nettv',
              'appletv',
              'boxee',
              'kylo',
              'roku',
              'dlnadoc',
              'roku',
              'pov_tv',
              'hbbtv',
              'ce-html'
            ],
              a = 0;
            a < television.length;

          ) {
            if (e(television[a])) return !0
            a++
          }
          return !1
        }),
        (a.portrait = function() {
          return window.innerHeight / window.innerWidth > 1
        }),
        (a.landscape = function() {
          return window.innerHeight / window.innerWidth < 1
        }),
        (a.noConflict = function() {
          return (window.device = b), this
        }),
        (e = function(a) {
          return -1 !== j.indexOf(a)
        }),
        (g = function(a) {
          var b
          return (b = new RegExp(a, 'i')), d.className.match(b)
        }),
        (c = function(a) {
          var b = null
          g(a) ||
            ((b = d.className.replace(/^\s+|\s+$/g, '')),
            (d.className = b + ' ' + a))
        }),
        (i = function(a) {
          g(a) && (d.className = d.className.replace(' ' + a, ''))
        }),
        a.ios()
          ? a.ipad()
            ? c('ios ipad tablet')
            : a.iphone()
            ? c('ios iphone mobile')
            : a.ipod() && c('ios ipod mobile')
          : a.android()
          ? c(a.androidTablet() ? 'android tablet' : 'android mobile')
          : a.blackberry()
          ? c(a.blackberryTablet() ? 'blackberry tablet' : 'blackberry mobile')
          : a.windows()
          ? c(
              a.windowsTablet()
                ? 'windows tablet'
                : a.windowsPhone()
                ? 'windows mobile'
                : 'desktop'
            )
          : a.fxos()
          ? c(a.fxosTablet() ? 'fxos tablet' : 'fxos mobile')
          : a.meego()
          ? c('meego mobile')
          : a.nodeWebkit()
          ? c('node-webkit')
          : a.television()
          ? c('television')
          : a.desktop() && c('desktop'),
        a.cordova() && c('cordova'),
        (f = function() {
          a.landscape()
            ? (i('portrait'), c('landscape'))
            : (i('landscape'), c('portrait'))
        }),
        (h = Object.prototype.hasOwnProperty.call(window, 'onorientationchange')
          ? 'orientationchange'
          : 'resize'),
        window.addEventListener
          ? window.addEventListener(h, f, !1)
          : window.attachEvent
          ? window.attachEvent(h, f)
          : (window[h] = f),
        f(),
        'function' == typeof define &&
        'object' == typeof define.amd &&
        define.amd
          ? define(function() {
              return a
            })
          : 'undefined' != typeof module && module.exports
          ? (module.exports = a)
          : (window.device = a)
    }.call(this)

    // "./thirdParty/threejs/three.js"
    // console.log('@@@@2 tree.js')

    // "./thirdParty/threejs/WebGL.js"
    // console.log('@@@@3 webGL')
    /**
     * @author alteredq / http://alteredqualia.com/
     * @author mr.doob / http://mrdoob.com/
     */
    var WEBGL = {
      isWebGLAvailable: function() {
        try {
          var canvas = document.createElement('canvas')
          return !!(
            window.WebGLRenderingContext &&
            (canvas.getContext('webgl') ||
              canvas.getContext('experimental-webgl'))
          )
        } catch (e) {
          return false
        }
      },

      isWebGL2Available: function() {
        try {
          var canvas = document.createElement('canvas')
          return !!(
            window.WebGL2RenderingContext && canvas.getContext('webgl2')
          )
        } catch (e) {
          return false
        }
      },

      getWebGLErrorMessage: function() {
        return this.getErrorMessage(1)
      },

      getWebGL2ErrorMessage: function() {
        return this.getErrorMessage(2)
      },

      getErrorMessage: function(version) {
        var names = {
          1: 'WebGL',
          2: 'WebGL 2'
        }

        var contexts = {
          1: window.WebGLRenderingContext,
          2: window.WebGL2RenderingContext
        }

        var message =
          'Your $0 does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">$1</a>'

        var element = document.createElement('div')
        element.id = 'webglmessage'
        element.style.fontFamily = 'monospace'
        element.style.fontSize = '13px'
        element.style.fontWeight = 'normal'
        element.style.textAlign = 'center'
        element.style.background = '#fff'
        element.style.color = '#000'
        element.style.padding = '1.5em'
        element.style.width = '400px'
        element.style.margin = '5em auto 0'

        if (contexts[version]) {
          message = message.replace('$0', 'graphics card')
        } else {
          message = message.replace('$0', 'browser')
        }

        message = message.replace('$1', names[version])

        element.innerHTML = message

        return element
      }
    }

    // "./src/iesLoader.js"
    // console.log('@@@@4 iesLoader')
    var IES_Attribute = {
      Integral: 0.0,
      Multiplier: 1.0
    }
    !(function(t, e) {
      'object' == typeof exports && 'object' == typeof module
        ? (module.exports = e())
        : 'function' == typeof define && define.amd
        ? define([], e)
        : 'object' == typeof exports
        ? (exports.updateIES = e())
        : (t.updateIES = e())
    })(window, function() {
      const RESOLUTION = 256

      // Init IES Texture
      var IES = { IESTexture: { value: null } }
      THREE.UniformsLib.IESTEXTURE = null

      Object.assign(THREE.ShaderLib.standard.uniforms, IES)
      Object.assign(THREE.ShaderLib.physical.uniforms, IES)
      Object.assign(THREE.ShaderLib.phong.uniforms, IES)

      /** Update IES Texture On Light */
      function updateIES(inFileName, callback) {
        var iesTextureData = []
        // Read Binarys : reference : https://www.jb51.net/article/92623.htm
        var xhr = new XMLHttpRequest()
        xhr.responseType = 'arraybuffer'
        var binaries = null
        xhr.open('GET', inFileName)
        xhr.onreadystatechange = function() {
          if (xhr.readyState === 4) {
            if (xhr.status === 200 || xhr.status == 0) {
              binaries = xhr.response

              var i = 0
              var dataView = new DataView(binaries)

              IES_Attribute.Integral = dataView.getFloat64(i * 8, false)
              ++i
              IES_Attribute.Multiplier = dataView.getFloat64(i * 8, false)
              ++i

              for (i; i < dataView.byteLength / 8; ++i) {
                var float = dataView.getFloat64(i * 8, false)
                iesTextureData.push(float * IES_Attribute.Multiplier)
                iesTextureData.push(float * IES_Attribute.Multiplier)
                iesTextureData.push(float * IES_Attribute.Multiplier)
                iesTextureData.push(float * IES_Attribute.Multiplier)
              }

              var IESTexture = new THREE.DataTexture(
                new Float32Array(iesTextureData),
                RESOLUTION,
                RESOLUTION,
                THREE.RGBAFormat,
                THREE.FloatType,
                THREE.UVMapping,
                THREE.ClampToEdgeWrapping,
                THREE.ClampToEdgeWrapping,
                THREE.LinearFilter,
                THREE.NearestFilter,
                1
              )

              IESTexture.needsUpdate = true

              THREE.UniformsLib.IESTEXTURE = IESTexture

              callback()
            }
          }
        }
        xhr.send(null)
      }

      return updateIES
    })

    // "./src/scaleGridHelper.js"
    // console.log('@@@@5 scaleGridHelper')
    function ScaleGridHelper(size, divisions, color) {
      this.size = size || new THREE.Vector2(10, 10)
      this.divisions = divisions || new THREE.Vector2(10, 10)
      this.color = new THREE.Color(color !== undefined ? color : 0x888888)

      var step = new THREE.Vector2()
      step.copy(size).divide(divisions)

      var color = new THREE.Color(0xffffff)

      var step = new THREE.Vector2()
      step.copy(size).divide(divisions)

      var vertices = [],
        colors = []

      for (
        let i = 0, j = 0, k = -size.y / 2;
        i < divisions.y;
        ++i, k += step.y
      ) {
        vertices.push(-size.x / 2, 0, k, size.x / 2, 0, k)

        color.toArray(colors, j)
        j += 3
        color.toArray(colors, j)
        j += 3
        color.toArray(colors, j)
        j += 3
        color.toArray(colors, j)
        j += 3
      }

      for (
        let i = 0, j = 0, k = -size.x / 2;
        i < divisions.x;
        ++i, k += step.x
      ) {
        vertices.push(k, 0, -size.y / 2, k, 0, size.y / 2)

        color.toArray(colors, j)
        j += 3
        color.toArray(colors, j)
        j += 3
        color.toArray(colors, j)
        j += 3
        color.toArray(colors, j)
        j += 3
      }

      var geometry = new THREE.BufferGeometry()
      geometry.addAttribute(
        'position',
        new THREE.Float32BufferAttribute(vertices, 3)
      )
      geometry.addAttribute(
        'color',
        new THREE.Float32BufferAttribute(colors, 3)
      )

      var material = new THREE.LineBasicMaterial({
        vertexColors: THREE.VertexColors
      })

      THREE.LineSegments.call(this, geometry, material)
    }
    ScaleGridHelper.prototype = Object.assign(
      Object.create(THREE.LineSegments.prototype),
      {
        constructor: ScaleGridHelper,

        copy: function(source) {
          THREE.LineSegments.prototype.copy.call(this, source)

          this.geometry.copy(source.geometry)
          this.material.copy(source.material)

          return this
        },

        clone: function() {
          return new this.constructor().copy(this)
        }
      }
    )

    // "./thirdParty/threejs/shaders/CopyShader.js"
    // console.log('@@@@6 CopyShader')
    /**
     * @author alteredq / http://alteredqualia.com/
     *
     * Full-screen textured quad shader
     */
    THREE.CopyShader = {
      uniforms: {
        tDiffuse: { value: null },
        opacity: { value: 1.0 }
      },

      vertexShader: [
        'varying vec2 vUv;',
        'void main() {',
        'vUv = uv;',
        'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
        '}'
      ].join('\n'),

      fragmentShader: [
        'uniform float opacity;',
        'uniform sampler2D tDiffuse;',
        'varying vec2 vUv;',
        'void main() {',
        'vec4 texel = texture2D( tDiffuse, vUv );',
        'gl_FragColor = opacity * texel;',
        '}'
      ].join('\n')
    }

    // "./thirdParty/threejs/postprocessing/EffectComposer.js"
    // console.log('@@@@7 EffectComposer')
    /**
     * @author alteredq / http://alteredqualia.com/
     */
    THREE.EffectComposer = function(renderer, renderTarget) {
      this.renderer = renderer

      if (renderTarget === undefined) {
        var parameters = {
          minFilter: THREE.LinearFilter,
          magFilter: THREE.LinearFilter,
          format: THREE.RGBAFormat,
          stencilBuffer: false
        }

        var size = renderer.getDrawingBufferSize(new THREE.Vector2())
        renderTarget = new THREE.WebGLRenderTarget(
          size.width,
          size.height,
          parameters
        )
        renderTarget.texture.name = 'EffectComposer.rt1'
      }

      this.renderTarget1 = renderTarget
      this.renderTarget2 = renderTarget.clone()
      this.renderTarget2.texture.name = 'EffectComposer.rt2'

      this.writeBuffer = this.renderTarget1
      this.readBuffer = this.renderTarget2

      this.renderToScreen = true

      this.passes = []

      // dependencies

      if (THREE.CopyShader === undefined) {
        console.error('THREE.EffectComposer relies on THREE.CopyShader')
      }

      if (THREE.ShaderPass === undefined) {
        console.error('THREE.EffectComposer relies on THREE.ShaderPass')
      }

      this.copyPass = new THREE.ShaderPass(THREE.CopyShader)

      this._previousFrameTime = Date.now()
    }

    Object.assign(THREE.EffectComposer.prototype, {
      swapBuffers: function() {
        var tmp = this.readBuffer
        this.readBuffer = this.writeBuffer
        this.writeBuffer = tmp
      },

      addPass: function(pass) {
        this.passes.push(pass)

        var size = this.renderer.getDrawingBufferSize(new THREE.Vector2())
        pass.setSize(size.width, size.height)
      },

      insertPass: function(pass, index) {
        this.passes.splice(index, 0, pass)
      },

      isLastEnabledPass: function(passIndex) {
        for (var i = passIndex + 1; i < this.passes.length; i++) {
          if (this.passes[i].enabled) {
            return false
          }
        }

        return true
      },

      render: function(deltaTime) {
        // deltaTime value is in seconds

        if (deltaTime === undefined) {
          deltaTime = (Date.now() - this._previousFrameTime) * 0.001
        }

        this._previousFrameTime = Date.now()

        var currentRenderTarget = this.renderer.getRenderTarget()

        var maskActive = false

        var pass,
          i,
          il = this.passes.length

        for (i = 0; i < il; i++) {
          pass = this.passes[i]

          if (pass.enabled === false) continue

          pass.renderToScreen = this.renderToScreen && this.isLastEnabledPass(i)
          pass.render(
            this.renderer,
            this.writeBuffer,
            this.readBuffer,
            deltaTime,
            maskActive
          )

          if (pass.needsSwap) {
            if (maskActive) {
              var context = this.renderer.context

              context.stencilFunc(context.NOTEQUAL, 1, 0xffffffff)

              this.copyPass.render(
                this.renderer,
                this.writeBuffer,
                this.readBuffer,
                deltaTime
              )

              context.stencilFunc(context.EQUAL, 1, 0xffffffff)
            }

            this.swapBuffers()
          }

          if (THREE.MaskPass !== undefined) {
            if (pass instanceof THREE.MaskPass) {
              maskActive = true
            } else if (pass instanceof THREE.ClearMaskPass) {
              maskActive = false
            }
          }
        }

        this.renderer.setRenderTarget(currentRenderTarget)
      },

      reset: function(renderTarget) {
        if (renderTarget === undefined) {
          var size = this.renderer.getDrawingBufferSize(new THREE.Vector2())

          renderTarget = this.renderTarget1.clone()
          renderTarget.setSize(size.width, size.height)
        }

        this.renderTarget1.dispose()
        this.renderTarget2.dispose()
        this.renderTarget1 = renderTarget
        this.renderTarget2 = renderTarget.clone()

        this.writeBuffer = this.renderTarget1
        this.readBuffer = this.renderTarget2
      },

      setSize: function(width, height) {
        this.renderTarget1.setSize(width, height)
        this.renderTarget2.setSize(width, height)

        for (var i = 0; i < this.passes.length; i++) {
          this.passes[i].setSize(width, height)
        }
      }
    })

    THREE.Pass = function() {
      // if set to true, the pass is processed by the composer
      this.enabled = true

      // if set to true, the pass indicates to swap read and write buffer after rendering
      this.needsSwap = true

      // if set to true, the pass clears its buffer before rendering
      this.clear = false

      // if set to true, the result of the pass is rendered to screen. This is set automatically by EffectComposer.
      this.renderToScreen = false
    }

    Object.assign(THREE.Pass.prototype, {
      setSize: function(width, height) {},

      render: function(
        renderer,
        writeBuffer,
        readBuffer,
        deltaTime,
        maskActive
      ) {
        console.error(
          'THREE.Pass: .render() must be implemented in derived pass.'
        )
      }
    })

    // Helper for passes that need to fill the viewport with a single quad.
    THREE.Pass.FullScreenQuad = (function() {
      var camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
      var geometry = new THREE.PlaneBufferGeometry(2, 2)

      var FullScreenQuad = function(material) {
        this._mesh = new THREE.Mesh(geometry, material)
      }

      Object.defineProperty(FullScreenQuad.prototype, 'material', {
        get: function() {
          return this._mesh.material
        },

        set: function(value) {
          this._mesh.material = value
        }
      })

      Object.assign(FullScreenQuad.prototype, {
        render: function(renderer) {
          renderer.render(this._mesh, camera)
        }
      })

      return FullScreenQuad
    })()

    // "./thirdParty/threejs/postprocessing/RenderPass.js"
    // console.log('@@@@8 RenderPass')
    /**
     * @author alteredq / http://alteredqualia.com/
     */
    THREE.RenderPass = function(
      scene,
      camera,
      overrideMaterial,
      clearColor,
      clearAlpha
    ) {
      THREE.Pass.call(this)

      this.scene = scene
      this.camera = camera

      this.overrideMaterial = overrideMaterial

      this.clearColor = clearColor
      this.clearAlpha = clearAlpha !== undefined ? clearAlpha : 0

      this.clear = true
      this.clearDepth = false
      this.needsSwap = false
    }

    THREE.RenderPass.prototype = Object.assign(
      Object.create(THREE.Pass.prototype),
      {
        constructor: THREE.RenderPass,

        render: function(
          renderer,
          writeBuffer,
          readBuffer,
          deltaTime,
          maskActive
        ) {
          var oldAutoClear = renderer.autoClear
          renderer.autoClear = false

          this.scene.overrideMaterial = this.overrideMaterial

          var oldClearColor, oldClearAlpha

          if (this.clearColor) {
            oldClearColor = renderer.getClearColor().getHex()
            oldClearAlpha = renderer.getClearAlpha()

            renderer.setClearColor(this.clearColor, this.clearAlpha)
          }

          if (this.clearDepth) {
            renderer.clearDepth()
          }

          renderer.setRenderTarget(this.renderToScreen ? null : readBuffer)

          // TODO: Avoid using autoClear properties, see https://github.com/mrdoob/three.js/pull/15571#issuecomment-465669600
          if (this.clear)
            renderer.clear(
              renderer.autoClearColor,
              renderer.autoClearDepth,
              renderer.autoClearStencil
            )
          renderer.render(this.scene, this.camera)

          if (this.clearColor) {
            renderer.setClearColor(oldClearColor, oldClearAlpha)
          }

          this.scene.overrideMaterial = null
          renderer.autoClear = oldAutoClear
        }
      }
    )

    // "./thirdParty/threejs/postprocessing/ShaderPass.js"
    // console.log('@@@@9 ShaderPass')
    /**
     * @author alteredq / http://alteredqualia.com/
     */
    THREE.ShaderPass = function(shader, textureID) {
      THREE.Pass.call(this)

      this.textureID = textureID !== undefined ? textureID : 'tDiffuse'

      if (shader instanceof THREE.ShaderMaterial) {
        this.uniforms = shader.uniforms

        this.material = shader
      } else if (shader) {
        this.uniforms = THREE.UniformsUtils.clone(shader.uniforms)

        this.material = new THREE.ShaderMaterial({
          defines: Object.assign({}, shader.defines),
          uniforms: this.uniforms,
          vertexShader: shader.vertexShader,
          fragmentShader: shader.fragmentShader
        })
      }

      this.fsQuad = new THREE.Pass.FullScreenQuad(this.material)
    }

    THREE.ShaderPass.prototype = Object.assign(
      Object.create(THREE.Pass.prototype),
      {
        constructor: THREE.ShaderPass,

        render: function(
          renderer,
          writeBuffer,
          readBuffer,
          deltaTime,
          maskActive
        ) {
          if (this.uniforms[this.textureID]) {
            this.uniforms[this.textureID].value = readBuffer.texture
          }

          this.fsQuad.material = this.material

          if (this.renderToScreen) {
            renderer.setRenderTarget(null)
            this.fsQuad.render(renderer)
          } else {
            renderer.setRenderTarget(writeBuffer)
            // TODO: Avoid using autoClear properties, see https://github.com/mrdoob/three.js/pull/15571#issuecomment-465669600
            if (this.clear)
              renderer.clear(
                renderer.autoClearColor,
                renderer.autoClearDepth,
                renderer.autoClearStencil
              )
            this.fsQuad.render(renderer)
          }
        }
      }
    )

    // "./src/luxShader.js"
    // console.log('@@@@10 luxShader')
    THREE.LuxLut = function(numberofcolors) {
      this.lut = []
      this.map = [
        [0.0, '0x000000'],
        [0.1, '0x0000FF'],
        [0.2, '0x007FFF'],
        [0.3, '0x00FFFF'],
        [0.4, '0x00FF7F'],
        [0.5, '0x00FF00'],
        [0.6, '0x7FFF00'],
        [0.7, '0xFFFF00'],
        [0.8, '0xFF7F00'],
        [0.9, '0xFF0000'],
        [1.0, '0xFFFFFF']
      ]
      this.n = numberofcolors

      var step = 1.0 / this.n

      for (var i = 0; i <= 1; i += step) {
        for (var j = 0; j < this.map.length - 1; j++) {
          if (i >= this.map[j][0] && i < this.map[j + 1][0]) {
            var min = this.map[j][0]
            var max = this.map[j + 1][0]

            var minColor = new THREE.Color(0xffffff).setHex(this.map[j][1])
            var maxColor = new THREE.Color(0xffffff).setHex(this.map[j + 1][1])

            var color = minColor.lerp(maxColor, (i - min) / (max - min))

            this.lut.push(color.r)
            this.lut.push(color.g)
            this.lut.push(color.b)
            this.lut.push(1.0)
          }
        }
      }
    }

    var luxLut = new THREE.LuxLut(512)
    var luxTexture = new THREE.DataTexture(
      new Float32Array(luxLut.lut),
      512,
      1,
      THREE.RGBAFormat,
      THREE.FloatType,
      THREE.UVMapping,
      THREE.ClampToEdgeWrapping,
      THREE.ClampToEdgeWrapping,
      THREE.LinearFilter,
      THREE.NearestFilter
    )
    luxTexture.needsUpdate = true

    var luxShader = {
      uniforms: {
        tDiffuse: { value: null },
        tLuxLut: { type: 't', value: null },
        bContour: { value: 0 },
        maxLux: { value: 1000 }
      },
      vertexShader: [
        'varying vec2 vUv;',
        'void main(){',
        'vUv = uv;',
        'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
        '}'
      ].join('\n'),
      fragmentShader: [
        '#include <common>',
        'uniform sampler2D tDiffuse;',
        'uniform sampler2D tLuxLut;',
        'uniform int bContour;',
        'uniform float maxLux;',
        'varying vec2 vUv;',
        'void main() {',
        'vec4 texel = texture2D( tDiffuse, vUv );',
        'float l = linearToRelativeLuminance( texel.rgb );',
        'l *= 625.0 * PI * 3.333333;',
        'float filter = l - maxLux;',
        'l /= maxLux;',
        'vec4 color = vec4(0,0,0,0);',
        'if(bContour > 0){',
        'float contour = l * 10.0;',
        'float luxContour = pow(contour+0.8, 2.0) * 0.01;',
        'contour = mod(contour, 1.0);',
        'if(contour >= luxContour){',
        'contour = 1.0;',
        '} else{',
        'contour = 0.0;',
        '}',
        'color = mix(texture2D(tLuxLut, vec2(l,0)), vec4(l,l,l,1.0), contour);',
        'color = mix(color, vec4(1.0,1.0,1.0,1.0), clamp(filter,0.0,1.0));',
        '} else {',
        'color = texture2D(tLuxLut, vec2(l,0));',
        '}',
        'gl_FragColor = color;',
        '}'
      ].join('\n')
    }

    // "./thirdParty/threejs/libs/Stats.min.js"
    // console.log('@@@@11 Stats')
    // stats.js - http://github.com/mrdoob/stats.js
    var Stats = function() {
      function h(a) {
        c.appendChild(a.dom)
        return a
      }
      function k(a) {
        for (var d = 0; d < c.children.length; d++)
          c.children[d].style.display = d === a ? 'block' : 'none'
        l = a
      }
      var l = 0,
        c = document.createElement('div')
      c.style.cssText =
        'position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000'
      c.addEventListener(
        'click',
        function(a) {
          a.preventDefault()
          k(++l % c.children.length)
        },
        !1
      )
      var g = (performance || Date).now(),
        e = g,
        a = 0,
        r = h(new Stats.Panel('FPS', '#0ff', '#002')),
        f = h(new Stats.Panel('MS', '#0f0', '#020'))
      if (self.performance && self.performance.memory)
        var t = h(new Stats.Panel('MB', '#f08', '#201'))
      k(0)
      return {
        REVISION: 16,
        dom: c,
        addPanel: h,
        showPanel: k,
        begin: function() {
          g = (performance || Date).now()
        },
        end: function() {
          a++
          var c = (performance || Date).now()
          f.update(c - g, 200)
          if (
            c > e + 1e3 &&
            (r.update((1e3 * a) / (c - e), 100), (e = c), (a = 0), t)
          ) {
            var d = performance.memory
            t.update(d.usedJSHeapSize / 1048576, d.jsHeapSizeLimit / 1048576)
          }
          return c
        },
        update: function() {
          g = this.end()
        },
        domElement: c,
        setMode: k
      }
    }
    Stats.Panel = function(h, k, l) {
      var c = Infinity,
        g = 0,
        e = Math.round,
        a = e(window.devicePixelRatio || 1),
        r = 80 * a,
        f = 48 * a,
        t = 3 * a,
        u = 2 * a,
        d = 3 * a,
        m = 15 * a,
        n = 74 * a,
        p = 30 * a,
        q = document.createElement('canvas')
      q.width = r
      q.height = f
      q.style.cssText = 'width:80px;height:48px'
      var b = q.getContext('2d')
      b.font = 'bold ' + 9 * a + 'px Helvetica,Arial,sans-serif'
      b.textBaseline = 'top'
      b.fillStyle = l
      b.fillRect(0, 0, r, f)
      b.fillStyle = k
      b.fillText(h, t, u)
      b.fillRect(d, m, n, p)
      b.fillStyle = l
      b.globalAlpha = 0.9
      b.fillRect(d, m, n, p)
      return {
        dom: q,
        update: function(f, v) {
          c = Math.min(c, f)
          g = Math.max(g, f)
          b.fillStyle = l
          b.globalAlpha = 1
          b.fillRect(0, 0, r, m)
          b.fillStyle = k
          b.fillText(e(f) + ' ' + h + ' (' + e(c) + '-' + e(g) + ')', t, u)
          b.drawImage(q, d + a, m, n - a, p, d, m, n - a, p)
          b.fillRect(d + n - a, m, a, p)
          b.fillStyle = l
          b.globalAlpha = 0.9
          b.fillRect(d + n - a, m, a, e((1 - f / v) * p))
        }
      }
    }
    'object' === typeof module && (module.exports = Stats)

    // "./thirdParty/threejs/libs/dat.gui.min.js"
    // console.log('@@@@12 dat.gui')
    /**
     * dat-gui JavaScript Controller Library
     * http://code.google.com/p/dat-gui
     *
     * Copyright 2011 Data Arts Team, Google Creative Lab
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     */
    !(function(e, t) {
      'object' == typeof exports && 'undefined' != typeof module
        ? t(exports)
        : 'function' == typeof define && define.amd
        ? define(['exports'], t)
        : t((e.dat = {}))
    })(this, function(e) {
      'use strict'
      function t(e, t) {
        var n = e.__state.conversionName.toString(),
          i = Math.round(e.r),
          o = Math.round(e.g),
          r = Math.round(e.b),
          s = e.a,
          a = Math.round(e.h),
          l = e.s.toFixed(1),
          d = e.v.toFixed(1)
        if (t || 'THREE_CHAR_HEX' === n || 'SIX_CHAR_HEX' === n) {
          for (var u = e.hex.toString(16); u.length < 6; ) u = '0' + u
          return '#' + u
        }
        return 'CSS_RGB' === n
          ? 'rgb(' + i + ',' + o + ',' + r + ')'
          : 'CSS_RGBA' === n
          ? 'rgba(' + i + ',' + o + ',' + r + ',' + s + ')'
          : 'HEX' === n
          ? '0x' + e.hex.toString(16)
          : 'RGB_ARRAY' === n
          ? '[' + i + ',' + o + ',' + r + ']'
          : 'RGBA_ARRAY' === n
          ? '[' + i + ',' + o + ',' + r + ',' + s + ']'
          : 'RGB_OBJ' === n
          ? '{r:' + i + ',g:' + o + ',b:' + r + '}'
          : 'RGBA_OBJ' === n
          ? '{r:' + i + ',g:' + o + ',b:' + r + ',a:' + s + '}'
          : 'HSV_OBJ' === n
          ? '{h:' + a + ',s:' + l + ',v:' + d + '}'
          : 'HSVA_OBJ' === n
          ? '{h:' + a + ',s:' + l + ',v:' + d + ',a:' + s + '}'
          : 'unknown format'
      }
      function n(e, t, n) {
        Object.defineProperty(e, t, {
          get: function() {
            return 'RGB' === this.__state.space
              ? this.__state[t]
              : (I.recalculateRGB(this, t, n), this.__state[t])
          },
          set: function(e) {
            'RGB' !== this.__state.space &&
              (I.recalculateRGB(this, t, n), (this.__state.space = 'RGB')),
              (this.__state[t] = e)
          }
        })
      }
      function i(e, t) {
        Object.defineProperty(e, t, {
          get: function() {
            return 'HSV' === this.__state.space
              ? this.__state[t]
              : (I.recalculateHSV(this), this.__state[t])
          },
          set: function(e) {
            'HSV' !== this.__state.space &&
              (I.recalculateHSV(this), (this.__state.space = 'HSV')),
              (this.__state[t] = e)
          }
        })
      }
      function o(e) {
        if ('0' === e || T.isUndefined(e)) return 0
        var t = e.match(Y)
        return T.isNull(t) ? 0 : parseFloat(t[1])
      }
      function r(e) {
        var t = e.toString()
        return t.indexOf('.') > -1 ? t.length - t.indexOf('.') - 1 : 0
      }
      function s(e, t) {
        var n = Math.pow(10, t)
        return Math.round(e * n) / n
      }
      function a(e, t, n, i, o) {
        return i + ((e - t) / (n - t)) * (o - i)
      }
      function l(e, t) {
        var n = Math.pow(10, t)
        return Math.round(e * n) / n
      }
      function d(e) {
        var t = e.toString()
        return t.indexOf('.') > -1 ? t.length - t.indexOf('.') - 1 : 0
      }
      function u(e, t, n, i) {
        ;(e.style.background = ''),
          T.each(oe, function(o) {
            e.style.cssText +=
              'background: ' +
              o +
              'linear-gradient(' +
              t +
              ', ' +
              n +
              ' 0%, ' +
              i +
              ' 100%); '
          })
      }
      function c(e) {
        ;(e.style.background = ''),
          (e.style.cssText +=
            'background: -moz-linear-gradient(top,  #ff0000 0%, #ff00ff 17%, #0000ff 34%, #00ffff 50%, #00ff00 67%, #ffff00 84%, #ff0000 100%);'),
          (e.style.cssText +=
            'background: -webkit-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);'),
          (e.style.cssText +=
            'background: -o-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);'),
          (e.style.cssText +=
            'background: -ms-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);'),
          (e.style.cssText +=
            'background: linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);')
      }
      function _(e, t, n) {
        var i = document.createElement('li')
        return (
          t && i.appendChild(t),
          n ? e.__ul.insertBefore(i, n) : e.__ul.appendChild(i),
          e.onResize(),
          i
        )
      }
      function h(e) {
        K.unbind(window, 'resize', e.__resizeHandler),
          e.saveToLocalStorageIfPossible &&
            K.unbind(window, 'unload', e.saveToLocalStorageIfPossible)
      }
      function p(e, t) {
        var n = e.__preset_select[e.__preset_select.selectedIndex]
        n.innerHTML = t ? n.value + '*' : n.value
      }
      function f(e, t, n) {
        if (
          ((n.__li = t),
          (n.__gui = e),
          T.extend(n, {
            options: function(t) {
              if (arguments.length > 1) {
                var i = n.__li.nextElementSibling
                return (
                  n.remove(),
                  b(e, n.object, n.property, {
                    before: i,
                    factoryArgs: [T.toArray(arguments)]
                  })
                )
              }
              if (T.isArray(t) || T.isObject(t)) {
                var o = n.__li.nextElementSibling
                return (
                  n.remove(),
                  b(e, n.object, n.property, { before: o, factoryArgs: [t] })
                )
              }
            },
            name: function(e) {
              return (
                (n.__li.firstElementChild.firstElementChild.innerHTML = e), n
              )
            },
            listen: function() {
              return n.__gui.listen(n), n
            },
            remove: function() {
              return n.__gui.remove(n), n
            }
          }),
          n instanceof $)
        ) {
          var i = new q(n.object, n.property, {
            min: n.__min,
            max: n.__max,
            step: n.__step
          })
          T.each(
            [
              'updateDisplay',
              'onChange',
              'onFinishChange',
              'step',
              'min',
              'max'
            ],
            function(e) {
              var t = n[e],
                o = i[e]
              n[e] = i[e] = function() {
                var e = Array.prototype.slice.call(arguments)
                return o.apply(i, e), t.apply(n, e)
              }
            }
          ),
            K.addClass(t, 'has-slider'),
            n.domElement.insertBefore(
              i.domElement,
              n.domElement.firstElementChild
            )
        } else if (n instanceof q) {
          var o = function(t) {
            if (T.isNumber(n.__min) && T.isNumber(n.__max)) {
              var i = n.__li.firstElementChild.firstElementChild.innerHTML,
                o = n.__gui.__listening.indexOf(n) > -1
              n.remove()
              var r = b(e, n.object, n.property, {
                before: n.__li.nextElementSibling,
                factoryArgs: [n.__min, n.__max, n.__step]
              })
              return r.name(i), o && r.listen(), r
            }
            return t
          }
          ;(n.min = T.compose(
            o,
            n.min
          )),
            (n.max = T.compose(
              o,
              n.max
            ))
        } else if (n instanceof ee) {
          var r = function(t) {
            if (T.isNumber(n.__min) && T.isNumber(n.__max)) {
              var i = n.__li.firstElementChild.firstElementChild.innerHTML,
                o = n.__gui.__listening.indexOf(n) > -1
              n.remove()
              var r = b(e, n.object, n.property, {
                before: n.__li.nextElementSibling,
                factoryArgs: [n.__min, n.__max, n.__step]
              })
              return r.name(i), o && r.listen(), r
            }
            return t
          }
          ;(n.min = T.compose(
            r,
            n.min
          )),
            (n.max = T.compose(
              r,
              n.max
            ))
        } else
          n instanceof J
            ? (K.bind(t, 'click', function() {
                K.fakeEvent(n.__checkbox, 'click')
              }),
              K.bind(n.__checkbox, 'click', function(e) {
                e.stopPropagation()
              }))
            : n instanceof te
            ? (K.bind(t, 'click', function() {
                K.fakeEvent(n.__button, 'click')
              }),
              K.bind(t, 'mouseover', function() {
                K.addClass(n.__button, 'hover')
              }),
              K.bind(t, 'mouseout', function() {
                K.removeClass(n.__button, 'hover')
              }))
            : n instanceof ne
            ? (K.bind(t, 'mouseover', function() {
                K.addClass(n.__div, 'hover')
              }),
              K.bind(t, 'mouseout', function() {
                K.removeClass(n.__div, 'hover')
              }))
            : n instanceof ie &&
              (K.addClass(t, 'color'),
              (n.updateDisplay = T.compose(
                function(e) {
                  return (t.style.borderLeftColor = n.__color.toString()), e
                },
                n.updateDisplay
              )),
              n.updateDisplay())
        n.setValue = T.compose(
          function(t) {
            return (
              e.getRoot().__preset_select &&
                n.isModified() &&
                p(e.getRoot(), !0),
              t
            )
          },
          n.setValue
        )
      }
      function m(e, t) {
        var n = e.getRoot(),
          i = n.__rememberedObjects.indexOf(t.object)
        if (-1 !== i) {
          var o = n.__rememberedObjectIndecesToControllers[i]
          if (
            (void 0 === o &&
              ((o = {}), (n.__rememberedObjectIndecesToControllers[i] = o)),
            (o[t.property] = t),
            n.load && n.load.remembered)
          ) {
            var r = n.load.remembered,
              s = void 0
            if (r[e.preset]) s = r[e.preset]
            else {
              if (!r[ue]) return
              s = r[ue]
            }
            if (s[i] && void 0 !== s[i][t.property]) {
              var a = s[i][t.property]
              ;(t.initialValue = a), t.setValue(a)
            }
          }
        }
      }
      function b(e, t, n, i) {
        if (void 0 === t[n])
          throw new Error('Object "' + t + '" has no property "' + n + '"')
        var o = void 0
        if (i.color) o = new ie(t, n)
        else {
          var r = [t, n].concat(i.factoryArgs)
          o = se.apply(e, r)
        }
        i.before instanceof G && (i.before = i.before.__li),
          m(e, o),
          K.addClass(o.domElement, 'c')
        var s = document.createElement('span')
        K.addClass(s, 'property-name'), (s.innerHTML = o.property)
        var a = document.createElement('div')
        a.appendChild(s), a.appendChild(o.domElement)
        var l = _(e, a, i.before)
        return (
          K.addClass(l, be.CLASS_CONTROLLER_ROW),
          o instanceof ie
            ? K.addClass(l, 'color')
            : K.addClass(l, V(o.getValue())),
          f(e, l, o),
          e.__controllers.push(o),
          o
        )
      }
      function g(e, t) {
        return document.location.href + '.' + t
      }
      function v(e, t, n) {
        var i = document.createElement('option')
        ;(i.innerHTML = t),
          (i.value = t),
          e.__preset_select.appendChild(i),
          n && (e.__preset_select.selectedIndex = e.__preset_select.length - 1)
      }
      function y(e, t) {
        t.style.display = e.useLocalStorage ? 'block' : 'none'
      }
      function w(e) {
        var t = (e.__save_row = document.createElement('li'))
        K.addClass(e.domElement, 'has-save'),
          e.__ul.insertBefore(t, e.__ul.firstChild),
          K.addClass(t, 'save-row')
        var n = document.createElement('span')
        ;(n.innerHTML = '&nbsp;'), K.addClass(n, 'button gears')
        var i = document.createElement('span')
        ;(i.innerHTML = 'Save'), K.addClass(i, 'button'), K.addClass(i, 'save')
        var o = document.createElement('span')
        ;(o.innerHTML = 'New'),
          K.addClass(o, 'button'),
          K.addClass(o, 'save-as')
        var r = document.createElement('span')
        ;(r.innerHTML = 'Revert'),
          K.addClass(r, 'button'),
          K.addClass(r, 'revert')
        var s = (e.__preset_select = document.createElement('select'))
        if (
          (e.load && e.load.remembered
            ? T.each(e.load.remembered, function(t, n) {
                v(e, n, n === e.preset)
              })
            : v(e, ue, !1),
          K.bind(s, 'change', function() {
            for (var t = 0; t < e.__preset_select.length; t++)
              e.__preset_select[t].innerHTML = e.__preset_select[t].value
            e.preset = this.value
          }),
          t.appendChild(s),
          t.appendChild(n),
          t.appendChild(i),
          t.appendChild(o),
          t.appendChild(r),
          ce)
        ) {
          var a = document.getElementById('dg-local-explain'),
            l = document.getElementById('dg-local-storage')
          ;(document.getElementById('dg-save-locally').style.display = 'block'),
            'true' === localStorage.getItem(g(e, 'isLocal')) &&
              l.setAttribute('checked', 'checked'),
            y(e, a),
            K.bind(l, 'change', function() {
              ;(e.useLocalStorage = !e.useLocalStorage), y(e, a)
            })
        }
        var d = document.getElementById('dg-new-constructor')
        K.bind(d, 'keydown', function(e) {
          !e.metaKey || (67 !== e.which && 67 !== e.keyCode) || _e.hide()
        }),
          K.bind(n, 'click', function() {
            ;(d.innerHTML = JSON.stringify(e.getSaveObject(), void 0, 2)),
              _e.show(),
              d.focus(),
              d.select()
          }),
          K.bind(i, 'click', function() {
            e.save()
          }),
          K.bind(o, 'click', function() {
            var t = prompt('Enter a new preset name.')
            t && e.saveAs(t)
          }),
          K.bind(r, 'click', function() {
            e.revert()
          })
      }
      function x(e) {
        function t(t) {
          return (
            t.preventDefault(),
            (e.width += o - t.clientX),
            e.onResize(),
            (o = t.clientX),
            !1
          )
        }
        function n() {
          K.removeClass(e.__closeButton, be.CLASS_DRAG),
            K.unbind(window, 'mousemove', t),
            K.unbind(window, 'mouseup', n)
        }
        function i(i) {
          return (
            i.preventDefault(),
            (o = i.clientX),
            K.addClass(e.__closeButton, be.CLASS_DRAG),
            K.bind(window, 'mousemove', t),
            K.bind(window, 'mouseup', n),
            !1
          )
        }
        var o = void 0
        ;(e.__resize_handle = document.createElement('div')),
          T.extend(e.__resize_handle.style, {
            width: '6px',
            marginLeft: '-3px',
            height: '200px',
            cursor: 'ew-resize',
            position: 'absolute'
          }),
          K.bind(e.__resize_handle, 'mousedown', i),
          K.bind(e.__closeButton, 'mousedown', i),
          e.domElement.insertBefore(
            e.__resize_handle,
            e.domElement.firstElementChild
          )
      }
      function E(e, t) {
        ;(e.domElement.style.width = t + 'px'),
          e.__save_row && e.autoPlace && (e.__save_row.style.width = t + 'px'),
          e.__closeButton && (e.__closeButton.style.width = t + 'px')
      }
      function C(e, t) {
        var n = {}
        return (
          T.each(e.__rememberedObjects, function(i, o) {
            var r = {},
              s = e.__rememberedObjectIndecesToControllers[o]
            T.each(s, function(e, n) {
              r[n] = t ? e.initialValue : e.getValue()
            }),
              (n[o] = r)
          }),
          n
        )
      }
      function A(e) {
        for (var t = 0; t < e.__preset_select.length; t++)
          e.__preset_select[t].value === e.preset &&
            (e.__preset_select.selectedIndex = t)
      }
      function k(e) {
        0 !== e.length &&
          ae.call(window, function() {
            k(e)
          }),
          T.each(e, function(e) {
            e.updateDisplay()
          })
      }
      var S = Array.prototype.forEach,
        O = Array.prototype.slice,
        T = {
          BREAK: {},
          extend: function(e) {
            return (
              this.each(
                O.call(arguments, 1),
                function(t) {
                  ;(this.isObject(t) ? Object.keys(t) : []).forEach(
                    function(n) {
                      this.isUndefined(t[n]) || (e[n] = t[n])
                    }.bind(this)
                  )
                },
                this
              ),
              e
            )
          },
          defaults: function(e) {
            return (
              this.each(
                O.call(arguments, 1),
                function(t) {
                  ;(this.isObject(t) ? Object.keys(t) : []).forEach(
                    function(n) {
                      this.isUndefined(e[n]) && (e[n] = t[n])
                    }.bind(this)
                  )
                },
                this
              ),
              e
            )
          },
          compose: function() {
            var e = O.call(arguments)
            return function() {
              for (var t = O.call(arguments), n = e.length - 1; n >= 0; n--)
                t = [e[n].apply(this, t)]
              return t[0]
            }
          },
          each: function(e, t, n) {
            if (e)
              if (S && e.forEach && e.forEach === S) e.forEach(t, n)
              else if (e.length === e.length + 0) {
                var i = void 0,
                  o = void 0
                for (i = 0, o = e.length; i < o; i++)
                  if (i in e && t.call(n, e[i], i) === this.BREAK) return
              } else
                for (var r in e) if (t.call(n, e[r], r) === this.BREAK) return
          },
          defer: function(e) {
            setTimeout(e, 0)
          },
          debounce: function(e, t, n) {
            var i = void 0
            return function() {
              var o = this,
                r = arguments,
                s = n || !i
              clearTimeout(i),
                (i = setTimeout(function() {
                  ;(i = null), n || e.apply(o, r)
                }, t)),
                s && e.apply(o, r)
            }
          },
          toArray: function(e) {
            return e.toArray ? e.toArray() : O.call(e)
          },
          isUndefined: function(e) {
            return void 0 === e
          },
          isNull: function(e) {
            return null === e
          },
          isNaN: (function(e) {
            function t(t) {
              return e.apply(this, arguments)
            }
            return (
              (t.toString = function() {
                return e.toString()
              }),
              t
            )
          })(function(e) {
            return isNaN(e)
          }),
          isArray:
            Array.isArray ||
            function(e) {
              return e.constructor === Array
            },
          isObject: function(e) {
            return e === Object(e)
          },
          isNumber: function(e) {
            return e === e + 0
          },
          isString: function(e) {
            return e === e + ''
          },
          isBoolean: function(e) {
            return !1 === e || !0 === e
          },
          isFunction: function(e) {
            return '[object Function]' === Object.prototype.toString.call(e)
          }
        },
        L = [
          {
            litmus: T.isString,
            conversions: {
              THREE_CHAR_HEX: {
                read: function(e) {
                  var t = e.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i)
                  return (
                    null !== t && {
                      space: 'HEX',
                      hex: parseInt(
                        '0x' +
                          t[1].toString() +
                          t[1].toString() +
                          t[2].toString() +
                          t[2].toString() +
                          t[3].toString() +
                          t[3].toString(),
                        0
                      )
                    }
                  )
                },
                write: t
              },
              SIX_CHAR_HEX: {
                read: function(e) {
                  var t = e.match(/^#([A-F0-9]{6})$/i)
                  return (
                    null !== t && {
                      space: 'HEX',
                      hex: parseInt('0x' + t[1].toString(), 0)
                    }
                  )
                },
                write: t
              },
              CSS_RGB: {
                read: function(e) {
                  var t = e.match(/^rgb\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/)
                  return (
                    null !== t && {
                      space: 'RGB',
                      r: parseFloat(t[1]),
                      g: parseFloat(t[2]),
                      b: parseFloat(t[3])
                    }
                  )
                },
                write: t
              },
              CSS_RGBA: {
                read: function(e) {
                  var t = e.match(
                    /^rgba\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/
                  )
                  return (
                    null !== t && {
                      space: 'RGB',
                      r: parseFloat(t[1]),
                      g: parseFloat(t[2]),
                      b: parseFloat(t[3]),
                      a: parseFloat(t[4])
                    }
                  )
                },
                write: t
              }
            }
          },
          {
            litmus: T.isNumber,
            conversions: {
              HEX: {
                read: function(e) {
                  return { space: 'HEX', hex: e, conversionName: 'HEX' }
                },
                write: function(e) {
                  return e.hex
                }
              }
            }
          },
          {
            litmus: T.isArray,
            conversions: {
              RGB_ARRAY: {
                read: function(e) {
                  return (
                    3 === e.length && {
                      space: 'RGB',
                      r: e[0],
                      g: e[1],
                      b: e[2]
                    }
                  )
                },
                write: function(e) {
                  return [e.r, e.g, e.b]
                }
              },
              RGBA_ARRAY: {
                read: function(e) {
                  return (
                    4 === e.length && {
                      space: 'RGB',
                      r: e[0],
                      g: e[1],
                      b: e[2],
                      a: e[3]
                    }
                  )
                },
                write: function(e) {
                  return [e.r, e.g, e.b, e.a]
                }
              }
            }
          },
          {
            litmus: T.isObject,
            conversions: {
              RGBA_OBJ: {
                read: function(e) {
                  return (
                    !!(
                      T.isNumber(e.r) &&
                      T.isNumber(e.g) &&
                      T.isNumber(e.b) &&
                      T.isNumber(e.a)
                    ) && { space: 'RGB', r: e.r, g: e.g, b: e.b, a: e.a }
                  )
                },
                write: function(e) {
                  return { r: e.r, g: e.g, b: e.b, a: e.a }
                }
              },
              RGB_OBJ: {
                read: function(e) {
                  return (
                    !!(
                      T.isNumber(e.r) &&
                      T.isNumber(e.g) &&
                      T.isNumber(e.b)
                    ) && {
                      space: 'RGB',
                      r: e.r,
                      g: e.g,
                      b: e.b
                    }
                  )
                },
                write: function(e) {
                  return { r: e.r, g: e.g, b: e.b }
                }
              },
              HSVA_OBJ: {
                read: function(e) {
                  return (
                    !!(
                      T.isNumber(e.h) &&
                      T.isNumber(e.s) &&
                      T.isNumber(e.v) &&
                      T.isNumber(e.a)
                    ) && { space: 'HSV', h: e.h, s: e.s, v: e.v, a: e.a }
                  )
                },
                write: function(e) {
                  return { h: e.h, s: e.s, v: e.v, a: e.a }
                }
              },
              HSV_OBJ: {
                read: function(e) {
                  return (
                    !!(
                      T.isNumber(e.h) &&
                      T.isNumber(e.s) &&
                      T.isNumber(e.v)
                    ) && {
                      space: 'HSV',
                      h: e.h,
                      s: e.s,
                      v: e.v
                    }
                  )
                },
                write: function(e) {
                  return { h: e.h, s: e.s, v: e.v }
                }
              }
            }
          }
        ],
        N = void 0,
        R = void 0,
        B = function() {
          R = !1
          var e = arguments.length > 1 ? T.toArray(arguments) : arguments[0]
          return (
            T.each(L, function(t) {
              if (t.litmus(e))
                return (
                  T.each(t.conversions, function(t, n) {
                    if (((N = t.read(e)), !1 === R && !1 !== N))
                      return (
                        (R = N),
                        (N.conversionName = n),
                        (N.conversion = t),
                        T.BREAK
                      )
                  }),
                  T.BREAK
                )
            }),
            R
          )
        },
        F = void 0,
        H = {
          hsv_to_rgb: function(e, t, n) {
            var i = Math.floor(e / 60) % 6,
              o = e / 60 - Math.floor(e / 60),
              r = n * (1 - t),
              s = n * (1 - o * t),
              a = n * (1 - (1 - o) * t),
              l = [
                [n, a, r],
                [s, n, r],
                [r, n, a],
                [r, s, n],
                [a, r, n],
                [n, r, s]
              ][i]
            return { r: 255 * l[0], g: 255 * l[1], b: 255 * l[2] }
          },
          rgb_to_hsv: function(e, t, n) {
            var i = Math.min(e, t, n),
              o = Math.max(e, t, n),
              r = o - i,
              s = void 0,
              a = void 0
            return 0 === o
              ? { h: NaN, s: 0, v: 0 }
              : ((a = r / o),
                (s =
                  e === o
                    ? (t - n) / r
                    : t === o
                    ? 2 + (n - e) / r
                    : 4 + (e - t) / r),
                (s /= 6) < 0 && (s += 1),
                { h: 360 * s, s: a, v: o / 255 })
          },
          rgb_to_hex: function(e, t, n) {
            var i = this.hex_with_component(0, 2, e)
            return (
              (i = this.hex_with_component(i, 1, t)),
              (i = this.hex_with_component(i, 0, n))
            )
          },
          component_from_hex: function(e, t) {
            return (e >> (8 * t)) & 255
          },
          hex_with_component: function(e, t, n) {
            return (n << (F = 8 * t)) | (e & ~(255 << F))
          }
        },
        V =
          'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
            ? function(e) {
                return typeof e
              }
            : function(e) {
                return e &&
                  'function' == typeof Symbol &&
                  e.constructor === Symbol &&
                  e !== Symbol.prototype
                  ? 'symbol'
                  : typeof e
              },
        D = function(e, t) {
          if (!(e instanceof t))
            throw new TypeError('Cannot call a class as a function')
        },
        j = (function() {
          function e(e, t) {
            for (var n = 0; n < t.length; n++) {
              var i = t[n]
              ;(i.enumerable = i.enumerable || !1),
                (i.configurable = !0),
                'value' in i && (i.writable = !0),
                Object.defineProperty(e, i.key, i)
            }
          }
          return function(t, n, i) {
            return n && e(t.prototype, n), i && e(t, i), t
          }
        })(),
        P = function e(t, n, i) {
          null === t && (t = Function.prototype)
          var o = Object.getOwnPropertyDescriptor(t, n)
          if (void 0 === o) {
            var r = Object.getPrototypeOf(t)
            return null === r ? void 0 : e(r, n, i)
          }
          if ('value' in o) return o.value
          var s = o.get
          if (void 0 !== s) return s.call(i)
        },
        M = function(e, t) {
          if ('function' != typeof t && null !== t)
            throw new TypeError(
              'Super expression must either be null or a function, not ' +
                typeof t
            )
          ;(e.prototype = Object.create(t && t.prototype, {
            constructor: {
              value: e,
              enumerable: !1,
              writable: !0,
              configurable: !0
            }
          })),
            t &&
              (Object.setPrototypeOf
                ? Object.setPrototypeOf(e, t)
                : (e.__proto__ = t))
        },
        z = function(e, t) {
          if (!e)
            throw new ReferenceError(
              "this hasn't been initialised - super() hasn't been called"
            )
          return !t || ('object' != typeof t && 'function' != typeof t) ? e : t
        },
        I = (function() {
          function e() {
            if (
              (D(this, e),
              (this.__state = B.apply(this, arguments)),
              !1 === this.__state)
            )
              throw new Error('Failed to interpret color arguments')
            this.__state.a = this.__state.a || 1
          }
          return (
            j(e, [
              {
                key: 'toString',
                value: function() {
                  return t(this)
                }
              },
              {
                key: 'toHexString',
                value: function() {
                  return t(this, !0)
                }
              },
              {
                key: 'toOriginal',
                value: function() {
                  return this.__state.conversion.write(this)
                }
              }
            ]),
            e
          )
        })()
      ;(I.recalculateRGB = function(e, t, n) {
        if ('HEX' === e.__state.space)
          e.__state[t] = H.component_from_hex(e.__state.hex, n)
        else {
          if ('HSV' !== e.__state.space)
            throw new Error('Corrupted color state')
          T.extend(
            e.__state,
            H.hsv_to_rgb(e.__state.h, e.__state.s, e.__state.v)
          )
        }
      }),
        (I.recalculateHSV = function(e) {
          var t = H.rgb_to_hsv(e.r, e.g, e.b)
          T.extend(e.__state, { s: t.s, v: t.v }),
            T.isNaN(t.h)
              ? T.isUndefined(e.__state.h) && (e.__state.h = 0)
              : (e.__state.h = t.h)
        }),
        (I.COMPONENTS = ['r', 'g', 'b', 'h', 's', 'v', 'hex', 'a']),
        n(I.prototype, 'r', 2),
        n(I.prototype, 'g', 1),
        n(I.prototype, 'b', 0),
        i(I.prototype, 'h'),
        i(I.prototype, 's'),
        i(I.prototype, 'v'),
        Object.defineProperty(I.prototype, 'a', {
          get: function() {
            return this.__state.a
          },
          set: function(e) {
            this.__state.a = e
          }
        }),
        Object.defineProperty(I.prototype, 'hex', {
          get: function() {
            return (
              'HEX' !== !this.__state.space &&
                (this.__state.hex = H.rgb_to_hex(this.r, this.g, this.b)),
              this.__state.hex
            )
          },
          set: function(e) {
            ;(this.__state.space = 'HEX'), (this.__state.hex = e)
          }
        })
      var G = (function() {
          function e(t, n) {
            D(this, e),
              (this.initialValue = t[n]),
              (this.domElement = document.createElement('div')),
              (this.object = t),
              (this.property = n),
              (this.__onChange = void 0),
              (this.__onFinishChange = void 0)
          }
          return (
            j(e, [
              {
                key: 'onChange',
                value: function(e) {
                  return (this.__onChange = e), this
                }
              },
              {
                key: 'onFinishChange',
                value: function(e) {
                  return (this.__onFinishChange = e), this
                }
              },
              {
                key: 'setValue',
                value: function(e) {
                  return (
                    (this.object[this.property] = e),
                    this.__onChange && this.__onChange.call(this, e),
                    this.updateDisplay(),
                    this
                  )
                }
              },
              {
                key: 'getValue',
                value: function() {
                  return this.object[this.property]
                }
              },
              {
                key: 'updateDisplay',
                value: function() {
                  return this
                }
              },
              {
                key: 'isModified',
                value: function() {
                  return this.initialValue !== this.getValue()
                }
              },
              {
                key: 'show',
                value: function() {
                  this.__li.style.display = ''
                }
              },
              {
                key: 'hide',
                value: function() {
                  this.__li.style.display = 'none'
                }
              }
            ]),
            e
          )
        })(),
        U = {
          HTMLEvents: ['change'],
          MouseEvents: [
            'click',
            'mousemove',
            'mousedown',
            'mouseup',
            'mouseover'
          ],
          KeyboardEvents: ['keydown']
        },
        X = {}
      T.each(U, function(e, t) {
        T.each(e, function(e) {
          X[e] = t
        })
      })
      var Y = /(\d+(\.\d+)?)px/,
        K = {
          makeSelectable: function(e, t) {
            void 0 !== e &&
              void 0 !== e.style &&
              ((e.onselectstart = t
                ? function() {
                    return !1
                  }
                : function() {}),
              (e.style.MozUserSelect = t ? 'auto' : 'none'),
              (e.style.KhtmlUserSelect = t ? 'auto' : 'none'),
              (e.unselectable = t ? 'on' : 'off'))
          },
          makeFullscreen: function(e, t, n) {
            var i = n,
              o = t
            T.isUndefined(o) && (o = !0),
              T.isUndefined(i) && (i = !0),
              (e.style.position = 'absolute'),
              o && ((e.style.left = 0), (e.style.right = 0)),
              i && ((e.style.top = 0), (e.style.bottom = 0))
          },
          fakeEvent: function(e, t, n, i) {
            var o = n || {},
              r = X[t]
            if (!r) throw new Error('Event type ' + t + ' not supported.')
            var s = document.createEvent(r)
            switch (r) {
              case 'MouseEvents':
                var a = o.x || o.clientX || 0,
                  l = o.y || o.clientY || 0
                s.initMouseEvent(
                  t,
                  o.bubbles || !1,
                  o.cancelable || !0,
                  window,
                  o.clickCount || 1,
                  0,
                  0,
                  a,
                  l,
                  !1,
                  !1,
                  !1,
                  !1,
                  0,
                  null
                )
                break
              case 'KeyboardEvents':
                var d = s.initKeyboardEvent || s.initKeyEvent
                T.defaults(o, {
                  cancelable: !0,
                  ctrlKey: !1,
                  altKey: !1,
                  shiftKey: !1,
                  metaKey: !1,
                  keyCode: void 0,
                  charCode: void 0
                }),
                  d(
                    t,
                    o.bubbles || !1,
                    o.cancelable,
                    window,
                    o.ctrlKey,
                    o.altKey,
                    o.shiftKey,
                    o.metaKey,
                    o.keyCode,
                    o.charCode
                  )
                break
              default:
                s.initEvent(t, o.bubbles || !1, o.cancelable || !0)
            }
            T.defaults(s, i), e.dispatchEvent(s)
          },
          bind: function(e, t, n, i) {
            var o = i || !1
            return (
              e.addEventListener
                ? e.addEventListener(t, n, o)
                : e.attachEvent && e.attachEvent('on' + t, n),
              K
            )
          },
          unbind: function(e, t, n, i) {
            var o = i || !1
            return (
              e.removeEventListener
                ? e.removeEventListener(t, n, o)
                : e.detachEvent && e.detachEvent('on' + t, n),
              K
            )
          },
          addClass: function(e, t) {
            if (void 0 === e.className) e.className = t
            else if (e.className !== t) {
              var n = e.className.split(/ +/)
              ;-1 === n.indexOf(t) &&
                (n.push(t),
                (e.className = n
                  .join(' ')
                  .replace(/^\s+/, '')
                  .replace(/\s+$/, '')))
            }
            return K
          },
          removeClass: function(e, t) {
            if (t)
              if (e.className === t) e.removeAttribute('class')
              else {
                var n = e.className.split(/ +/),
                  i = n.indexOf(t)
                ;-1 !== i && (n.splice(i, 1), (e.className = n.join(' ')))
              }
            else e.className = void 0
            return K
          },
          hasClass: function(e, t) {
            return (
              new RegExp('(?:^|\\s+)' + t + '(?:\\s+|$)').test(e.className) ||
              !1
            )
          },
          getWidth: function(e) {
            var t = getComputedStyle(e)
            return (
              o(t['border-left-width']) +
              o(t['border-right-width']) +
              o(t['padding-left']) +
              o(t['padding-right']) +
              o(t.width)
            )
          },
          getHeight: function(e) {
            var t = getComputedStyle(e)
            return (
              o(t['border-top-width']) +
              o(t['border-bottom-width']) +
              o(t['padding-top']) +
              o(t['padding-bottom']) +
              o(t.height)
            )
          },
          getOffset: function(e) {
            var t = e,
              n = { left: 0, top: 0 }
            if (t.offsetParent)
              do {
                ;(n.left += t.offsetLeft),
                  (n.top += t.offsetTop),
                  (t = t.offsetParent)
              } while (t)
            return n
          },
          isActive: function(e) {
            return e === document.activeElement && (e.type || e.href)
          }
        },
        J = (function(e) {
          function t(e, n) {
            D(this, t)
            var i = z(
                this,
                (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n)
              ),
              o = i
            return (
              (i.__prev = i.getValue()),
              (i.__checkbox = document.createElement('input')),
              i.__checkbox.setAttribute('type', 'checkbox'),
              K.bind(
                i.__checkbox,
                'change',
                function() {
                  o.setValue(!o.__prev)
                },
                !1
              ),
              i.domElement.appendChild(i.__checkbox),
              i.updateDisplay(),
              i
            )
          }
          return (
            M(t, G),
            j(t, [
              {
                key: 'setValue',
                value: function(e) {
                  var n = P(
                    t.prototype.__proto__ || Object.getPrototypeOf(t.prototype),
                    'setValue',
                    this
                  ).call(this, e)
                  return (
                    this.__onFinishChange &&
                      this.__onFinishChange.call(this, this.getValue()),
                    (this.__prev = this.getValue()),
                    n
                  )
                }
              },
              {
                key: 'updateDisplay',
                value: function() {
                  return (
                    !0 === this.getValue()
                      ? (this.__checkbox.setAttribute('checked', 'checked'),
                        (this.__checkbox.checked = !0),
                        (this.__prev = !0))
                      : ((this.__checkbox.checked = !1), (this.__prev = !1)),
                    P(
                      t.prototype.__proto__ ||
                        Object.getPrototypeOf(t.prototype),
                      'updateDisplay',
                      this
                    ).call(this)
                  )
                }
              }
            ]),
            t
          )
        })(),
        W = (function(e) {
          function t(e, n, i) {
            D(this, t)
            var o = z(
                this,
                (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n)
              ),
              r = i,
              s = o
            if (
              ((o.__select = document.createElement('select')), T.isArray(r))
            ) {
              var a = {}
              T.each(r, function(e) {
                a[e] = e
              }),
                (r = a)
            }
            return (
              T.each(r, function(e, t) {
                var n = document.createElement('option')
                ;(n.innerHTML = t),
                  n.setAttribute('value', e),
                  s.__select.appendChild(n)
              }),
              o.updateDisplay(),
              K.bind(o.__select, 'change', function() {
                var e = this.options[this.selectedIndex].value
                s.setValue(e)
              }),
              o.domElement.appendChild(o.__select),
              o
            )
          }
          return (
            M(t, G),
            j(t, [
              {
                key: 'setValue',
                value: function(e) {
                  var n = P(
                    t.prototype.__proto__ || Object.getPrototypeOf(t.prototype),
                    'setValue',
                    this
                  ).call(this, e)
                  return (
                    this.__onFinishChange &&
                      this.__onFinishChange.call(this, this.getValue()),
                    n
                  )
                }
              },
              {
                key: 'updateDisplay',
                value: function() {
                  return K.isActive(this.__select)
                    ? this
                    : ((this.__select.value = this.getValue()),
                      P(
                        t.prototype.__proto__ ||
                          Object.getPrototypeOf(t.prototype),
                        'updateDisplay',
                        this
                      ).call(this))
                }
              }
            ]),
            t
          )
        })(),
        Q = (function(e) {
          function t(e, n) {
            function i() {
              r.setValue(r.__input.value)
            }
            D(this, t)
            var o = z(
                this,
                (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n)
              ),
              r = o
            return (
              (o.__input = document.createElement('input')),
              o.__input.setAttribute('type', 'text'),
              K.bind(o.__input, 'keyup', i),
              K.bind(o.__input, 'change', i),
              K.bind(o.__input, 'blur', function() {
                r.__onFinishChange && r.__onFinishChange.call(r, r.getValue())
              }),
              K.bind(o.__input, 'keydown', function(e) {
                13 === e.keyCode && this.blur()
              }),
              o.updateDisplay(),
              o.domElement.appendChild(o.__input),
              o
            )
          }
          return (
            M(t, G),
            j(t, [
              {
                key: 'updateDisplay',
                value: function() {
                  return (
                    K.isActive(this.__input) ||
                      (this.__input.value = this.getValue()),
                    P(
                      t.prototype.__proto__ ||
                        Object.getPrototypeOf(t.prototype),
                      'updateDisplay',
                      this
                    ).call(this)
                  )
                }
              }
            ]),
            t
          )
        })(),
        Z = (function(e) {
          function t(e, n, i) {
            D(this, t)
            var o = z(
                this,
                (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n)
              ),
              s = i || {}
            return (
              (o.__min = s.min),
              (o.__max = s.max),
              (o.__step = s.step),
              T.isUndefined(o.__step)
                ? 0 === o.initialValue
                  ? (o.__impliedStep = 1)
                  : (o.__impliedStep =
                      Math.pow(
                        10,
                        Math.floor(
                          Math.log(Math.abs(o.initialValue)) / Math.LN10
                        )
                      ) / 10)
                : (o.__impliedStep = o.__step),
              (o.__precision = r(o.__impliedStep)),
              o
            )
          }
          return (
            M(t, G),
            j(t, [
              {
                key: 'setValue',
                value: function(e) {
                  var n = e
                  return (
                    void 0 !== this.__min && n < this.__min
                      ? (n = this.__min)
                      : void 0 !== this.__max &&
                        n > this.__max &&
                        (n = this.__max),
                    void 0 !== this.__step &&
                      n % this.__step != 0 &&
                      (n = Math.round(n / this.__step) * this.__step),
                    P(
                      t.prototype.__proto__ ||
                        Object.getPrototypeOf(t.prototype),
                      'setValue',
                      this
                    ).call(this, n)
                  )
                }
              },
              {
                key: 'min',
                value: function(e) {
                  return (this.__min = e), this
                }
              },
              {
                key: 'max',
                value: function(e) {
                  return (this.__max = e), this
                }
              },
              {
                key: 'step',
                value: function(e) {
                  return (
                    (this.__step = e),
                    (this.__impliedStep = e),
                    (this.__precision = r(e)),
                    this
                  )
                }
              }
            ]),
            t
          )
        })(),
        q = (function(e) {
          function t(e, n, i) {
            function o() {
              l.__onFinishChange && l.__onFinishChange.call(l, l.getValue())
            }
            function r(e) {
              var t = d - e.clientY
              l.setValue(l.getValue() + t * l.__impliedStep), (d = e.clientY)
            }
            function s() {
              K.unbind(window, 'mousemove', r),
                K.unbind(window, 'mouseup', s),
                o()
            }
            D(this, t)
            var a = z(
              this,
              (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n, i)
            )
            a.__truncationSuspended = !1
            var l = a,
              d = void 0
            return (
              (a.__input = document.createElement('input')),
              a.__input.setAttribute('type', 'text'),
              K.bind(a.__input, 'change', function() {
                var e = parseFloat(l.__input.value)
                T.isNaN(e) || l.setValue(e)
              }),
              K.bind(a.__input, 'blur', function() {
                o()
              }),
              K.bind(a.__input, 'mousedown', function(e) {
                K.bind(window, 'mousemove', r),
                  K.bind(window, 'mouseup', s),
                  (d = e.clientY)
              }),
              K.bind(a.__input, 'keydown', function(e) {
                13 === e.keyCode &&
                  ((l.__truncationSuspended = !0),
                  this.blur(),
                  (l.__truncationSuspended = !1),
                  o())
              }),
              a.updateDisplay(),
              a.domElement.appendChild(a.__input),
              a
            )
          }
          return (
            M(t, Z),
            j(t, [
              {
                key: 'updateDisplay',
                value: function() {
                  return (
                    (this.__input.value = this.__truncationSuspended
                      ? this.getValue()
                      : s(this.getValue(), this.__precision)),
                    P(
                      t.prototype.__proto__ ||
                        Object.getPrototypeOf(t.prototype),
                      'updateDisplay',
                      this
                    ).call(this)
                  )
                }
              }
            ]),
            t
          )
        })(),
        $ = (function(e) {
          function t(e, n, i, o, r) {
            function s(e) {
              e.preventDefault()
              var t = _.__background.getBoundingClientRect()
              return (
                _.setValue(a(e.clientX, t.left, t.right, _.__min, _.__max)), !1
              )
            }
            function l() {
              K.unbind(window, 'mousemove', s),
                K.unbind(window, 'mouseup', l),
                _.__onFinishChange && _.__onFinishChange.call(_, _.getValue())
            }
            function d(e) {
              var t = e.touches[0].clientX,
                n = _.__background.getBoundingClientRect()
              _.setValue(a(t, n.left, n.right, _.__min, _.__max))
            }
            function u() {
              K.unbind(window, 'touchmove', d),
                K.unbind(window, 'touchend', u),
                _.__onFinishChange && _.__onFinishChange.call(_, _.getValue())
            }
            D(this, t)
            var c = z(
                this,
                (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n, {
                  min: i,
                  max: o,
                  step: r
                })
              ),
              _ = c
            return (
              (c.__background = document.createElement('div')),
              (c.__foreground = document.createElement('div')),
              K.bind(c.__background, 'mousedown', function(e) {
                document.activeElement.blur(),
                  K.bind(window, 'mousemove', s),
                  K.bind(window, 'mouseup', l),
                  s(e)
              }),
              K.bind(c.__background, 'touchstart', function(e) {
                1 === e.touches.length &&
                  (K.bind(window, 'touchmove', d),
                  K.bind(window, 'touchend', u),
                  d(e))
              }),
              K.addClass(c.__background, 'slider'),
              K.addClass(c.__foreground, 'slider-fg'),
              c.updateDisplay(),
              c.__background.appendChild(c.__foreground),
              c.domElement.appendChild(c.__background),
              c
            )
          }
          return (
            M(t, Z),
            j(t, [
              {
                key: 'updateDisplay',
                value: function() {
                  var e =
                    (this.getValue() - this.__min) / (this.__max - this.__min)
                  return (
                    (this.__foreground.style.width = 100 * e + '%'),
                    P(
                      t.prototype.__proto__ ||
                        Object.getPrototypeOf(t.prototype),
                      'updateDisplay',
                      this
                    ).call(this)
                  )
                }
              }
            ]),
            t
          )
        })(),
        ee = (function(e) {
          function t(e, n, i) {
            function o() {
              var e = []
              e.push(parseFloat(h.__inputX.value)),
                e.push(parseFloat(h.__inputY.value)),
                3 === h.__vectorNumber && e.push(parseFloat(h.__inputZ.value)),
                T.isNaN(e[0]) || T.isNaN(e[1]) || h.setValue(e)
            }
            function r() {
              h.__onFinishChange && h.__onFinishChange.call(h, h.getValue())
            }
            function s() {
              r()
            }
            function a() {
              K.unbind(window, 'mouseup', a), r()
            }
            function l(e) {
              K.bind(window, 'mouseup', a)
            }
            function u(e) {
              K.bind(e, 'change', o),
                K.bind(e, 'blur', s),
                K.bind(e, 'mousedown', l),
                K.bind(e, 'keydown', function(e) {
                  13 === e.keyCode &&
                    ((h.__truncationSuspended = !0),
                    this.blur(),
                    (h.__truncationSuspended = !1),
                    r())
                })
            }
            D(this, t)
            var c = z(
                this,
                (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n, i)
              ),
              _ = i || {}
            ;(c.__vectorNumber = c.getValue().length),
              (c.__min = _.min),
              (c.__max = _.max),
              (c.__step = _.step),
              T.isUndefined(c.__step)
                ? 0 === c.initialValue
                  ? (c.__impliedStep = 1)
                  : (c.__impliedStep =
                      Math.pow(
                        10,
                        Math.floor(
                          Math.log(Math.abs(c.initialValue)) / Math.LN10
                        )
                      ) / 10)
                : (c.__impliedStep = c.__step),
              (c.__precision = d(c.__impliedStep)),
              (c.__truncationSuspended = !1)
            var h = c
            return (
              (c.__vectorDiv = document.createElement('div')),
              (c.__vectorDiv.style = 'display:flex'),
              (c.__inputX = document.createElement('input')),
              c.__inputX.setAttribute('type', 'text'),
              K.addClass(c.__inputX, 'x'),
              (c.__inputY = document.createElement('input')),
              c.__inputY.setAttribute('type', 'text'),
              K.addClass(c.__inputY, 'y'),
              (c.__inputZ = null),
              3 === c.__vectorNumber &&
                ((c.__inputZ = document.createElement('input')),
                c.__inputZ.setAttribute('type', 'text'),
                K.addClass(c.__inputZ, 'z')),
              u(c.__inputX),
              u(c.__inputY),
              3 === c.__vectorNumber && u(c.__inputZ),
              c.updateDisplay(),
              c.domElement.appendChild(c.__vectorDiv),
              c.__vectorDiv.appendChild(c.__inputX),
              c.__vectorDiv.appendChild(c.__inputY),
              3 === c.__vectorNumber && c.__vectorDiv.appendChild(c.__inputZ),
              c
            )
          }
          return (
            M(t, G),
            j(t, [
              {
                key: 'setValue',
                value: function(e) {
                  var n = e
                  if (void 0 !== this.__min)
                    for (var i in n) i = Math.max(this.__min, i)
                  if (void 0 !== this.__max)
                    for (var o in n) o = Math.min(this.__max, o)
                  if (void 0 !== this.__step)
                    for (var r in n)
                      r = Math.round(r / this.__step) * this.__step
                  return P(
                    t.prototype.__proto__ || Object.getPrototypeOf(t.prototype),
                    'setValue',
                    this
                  ).call(this, n)
                }
              },
              {
                key: 'min',
                value: function(e) {
                  return (this.__min = e), this
                }
              },
              {
                key: 'max',
                value: function(e) {
                  return (this.__max = e), this
                }
              },
              {
                key: 'step',
                value: function(e) {
                  return (
                    (this.__step = e),
                    (this.__impliedStep = e),
                    (this.__precision = d(e)),
                    this
                  )
                }
              },
              {
                key: 'updateDisplay',
                value: function() {
                  return (
                    (this.__inputX.value = this.__truncationSuspended
                      ? this.getValue()[0]
                      : l(this.getValue()[0], this.__precision)),
                    (this.__inputY.value = this.__truncationSuspended
                      ? this.getValue()[1]
                      : l(this.getValue()[1], this.__precision)),
                    3 === this.__vectorNumber &&
                      (this.__inputZ.value = this.__truncationSuspended
                        ? this.getValue()[2]
                        : l(this.getValue()[2], this.__precision)),
                    P(
                      t.prototype.__proto__ ||
                        Object.getPrototypeOf(t.prototype),
                      'updateDisplay',
                      this
                    ).call(this)
                  )
                }
              }
            ]),
            t
          )
        })(),
        te = (function(e) {
          function t(e, n, i) {
            D(this, t)
            var o = z(
                this,
                (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n)
              ),
              r = o
            return (
              (o.__button = document.createElement('div')),
              (o.__button.innerHTML = void 0 === i ? 'Fire' : i),
              K.bind(o.__button, 'click', function(e) {
                return e.preventDefault(), r.fire(), !1
              }),
              K.addClass(o.__button, 'button'),
              o.domElement.appendChild(o.__button),
              o
            )
          }
          return (
            M(t, G),
            j(t, [
              {
                key: 'fire',
                value: function() {
                  this.__onChange && this.__onChange.call(this),
                    this.getValue().call(this.object),
                    this.__onFinishChange &&
                      this.__onFinishChange.call(this, this.getValue())
                }
              }
            ]),
            t
          )
        })(),
        ne = (function(e) {
          function t(e, n, i) {
            D(this, t)
            var o = z(
                this,
                (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n)
              ),
              r = o
            ;(o.__div = document.createElement('div')),
              (o.__div.style = 'display:flex'),
              (o.__buttons = [])
            for (var s in o.getValue())
              !(function(e) {
                var t = document.createElement('div')
                ;(t.innerHTML = e),
                  K.addClass(t, 'button'),
                  K.bind(t, 'click', function(t) {
                    return t.preventDefault(), r.fire(e), !1
                  }),
                  o.__div.appendChild(t),
                  o.__buttons.push(t)
              })(s)
            return o.domElement.appendChild(o.__div), o
          }
          return (
            M(t, G),
            j(t, [
              {
                key: 'fire',
                value: function(e) {
                  this.__onChange && this.__onChange.call(this),
                    this.getValue()[e].call(this.object),
                    this.__onFinishChange &&
                      this.__onFinishChange.call(this, this.getValue()[index])
                }
              }
            ]),
            t
          )
        })(),
        ie = (function(e) {
          function t(e, n) {
            function i(e) {
              d(e),
                K.bind(window, 'mousemove', d),
                K.bind(window, 'touchmove', d),
                K.bind(window, 'mouseup', r),
                K.bind(window, 'touchend', r)
            }
            function o(e) {
              _(e),
                K.bind(window, 'mousemove', _),
                K.bind(window, 'touchmove', _),
                K.bind(window, 'mouseup', s),
                K.bind(window, 'touchend', s)
            }
            function r() {
              K.unbind(window, 'mousemove', d),
                K.unbind(window, 'touchmove', d),
                K.unbind(window, 'mouseup', r),
                K.unbind(window, 'touchend', r),
                l()
            }
            function s() {
              K.unbind(window, 'mousemove', _),
                K.unbind(window, 'touchmove', _),
                K.unbind(window, 'mouseup', s),
                K.unbind(window, 'touchend', s),
                l()
            }
            function a() {
              var e = B(this.value)
              !1 !== e
                ? ((p.__color.__state = e), p.setValue(p.__color.toOriginal()))
                : (this.value = p.__color.toString())
            }
            function l() {
              p.__onFinishChange &&
                p.__onFinishChange.call(p, p.__color.toOriginal())
            }
            function d(e) {
              ;-1 === e.type.indexOf('touch') && e.preventDefault()
              var t = p.__saturation_field.getBoundingClientRect(),
                n = (e.touches && e.touches[0]) || e,
                i = n.clientX,
                o = n.clientY,
                r = (i - t.left) / (t.right - t.left),
                s = 1 - (o - t.top) / (t.bottom - t.top)
              return (
                s > 1 ? (s = 1) : s < 0 && (s = 0),
                r > 1 ? (r = 1) : r < 0 && (r = 0),
                (p.__color.v = s),
                (p.__color.s = r),
                p.setValue(p.__color.toOriginal()),
                !1
              )
            }
            function _(e) {
              ;-1 === e.type.indexOf('touch') && e.preventDefault()
              var t = p.__hue_field.getBoundingClientRect(),
                n =
                  1 -
                  (((e.touches && e.touches[0]) || e).clientY - t.top) /
                    (t.bottom - t.top)
              return (
                n > 1 ? (n = 1) : n < 0 && (n = 0),
                (p.__color.h = 360 * n),
                p.setValue(p.__color.toOriginal()),
                !1
              )
            }
            D(this, t)
            var h = z(
              this,
              (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n)
            )
            ;(h.__color = new I(h.getValue())), (h.__temp = new I(0))
            var p = h
            ;(h.domElement = document.createElement('div')),
              K.makeSelectable(h.domElement, !1),
              (h.__selector = document.createElement('div')),
              (h.__selector.className = 'selector'),
              (h.__saturation_field = document.createElement('div')),
              (h.__saturation_field.className = 'saturation-field'),
              (h.__field_knob = document.createElement('div')),
              (h.__field_knob.className = 'field-knob'),
              (h.__field_knob_border = '2px solid '),
              (h.__hue_knob = document.createElement('div')),
              (h.__hue_knob.className = 'hue-knob'),
              (h.__hue_field = document.createElement('div')),
              (h.__hue_field.className = 'hue-field'),
              (h.__input = document.createElement('input')),
              (h.__input.type = 'text'),
              (h.__input_textShadow = '0 1px 1px '),
              K.bind(h.__input, 'keydown', function(e) {
                13 === e.keyCode && a.call(this)
              }),
              K.bind(h.__input, 'blur', a),
              K.bind(h.__selector, 'mousedown', function() {
                K.addClass(this, 'drag').bind(window, 'mouseup', function() {
                  K.removeClass(p.__selector, 'drag')
                })
              }),
              K.bind(h.__selector, 'touchstart', function() {
                K.addClass(this, 'drag').bind(window, 'touchend', function() {
                  K.removeClass(p.__selector, 'drag')
                })
              })
            var f = document.createElement('div')
            return (
              T.extend(h.__selector.style, {
                width: '122px',
                height: '102px',
                padding: '3px',
                backgroundColor: '#222',
                boxShadow: '0px 1px 3px rgba(0,0,0,0.3)'
              }),
              T.extend(h.__field_knob.style, {
                position: 'absolute',
                width: '12px',
                height: '12px',
                border:
                  h.__field_knob_border + (h.__color.v < 0.5 ? '#fff' : '#000'),
                boxShadow: '0px 1px 3px rgba(0,0,0,0.5)',
                borderRadius: '12px',
                zIndex: 1
              }),
              T.extend(h.__hue_knob.style, {
                position: 'absolute',
                width: '15px',
                height: '2px',
                borderRight: '4px solid #fff',
                zIndex: 1
              }),
              T.extend(h.__saturation_field.style, {
                width: '100px',
                height: '100px',
                border: '1px solid #555',
                marginRight: '3px',
                display: 'inline-block',
                cursor: 'pointer'
              }),
              T.extend(f.style, {
                width: '100%',
                height: '100%',
                background: 'none'
              }),
              u(f, 'top', 'rgba(0,0,0,0)', '#000'),
              T.extend(h.__hue_field.style, {
                width: '15px',
                height: '100px',
                border: '1px solid #555',
                cursor: 'ns-resize',
                position: 'absolute',
                top: '3px',
                right: '3px'
              }),
              c(h.__hue_field),
              T.extend(h.__input.style, {
                outline: 'none',
                textAlign: 'center',
                color: '#fff',
                border: 0,
                fontWeight: 'bold',
                textShadow: h.__input_textShadow + 'rgba(0,0,0,0.7)'
              }),
              K.bind(h.__saturation_field, 'mousedown', i),
              K.bind(h.__saturation_field, 'touchstart', i),
              K.bind(h.__field_knob, 'mousedown', i),
              K.bind(h.__field_knob, 'touchstart', i),
              K.bind(h.__hue_field, 'mousedown', o),
              K.bind(h.__hue_field, 'touchstart', o),
              h.__saturation_field.appendChild(f),
              h.__selector.appendChild(h.__field_knob),
              h.__selector.appendChild(h.__saturation_field),
              h.__selector.appendChild(h.__hue_field),
              h.__hue_field.appendChild(h.__hue_knob),
              h.domElement.appendChild(h.__input),
              h.domElement.appendChild(h.__selector),
              h.updateDisplay(),
              h
            )
          }
          return (
            M(t, G),
            j(t, [
              {
                key: 'updateDisplay',
                value: function() {
                  var e = B(this.getValue())
                  if (!1 !== e) {
                    var t = !1
                    T.each(
                      I.COMPONENTS,
                      function(n) {
                        if (
                          !T.isUndefined(e[n]) &&
                          !T.isUndefined(this.__color.__state[n]) &&
                          e[n] !== this.__color.__state[n]
                        )
                          return (t = !0), {}
                      },
                      this
                    ),
                      t && T.extend(this.__color.__state, e)
                  }
                  T.extend(this.__temp.__state, this.__color.__state),
                    (this.__temp.a = 1)
                  var n =
                      this.__color.v < 0.5 || this.__color.s > 0.5 ? 255 : 0,
                    i = 255 - n
                  T.extend(this.__field_knob.style, {
                    marginLeft: 100 * this.__color.s - 7 + 'px',
                    marginTop: 100 * (1 - this.__color.v) - 7 + 'px',
                    backgroundColor: this.__temp.toHexString(),
                    border:
                      this.__field_knob_border +
                      'rgb(' +
                      n +
                      ',' +
                      n +
                      ',' +
                      n +
                      ')'
                  }),
                    (this.__hue_knob.style.marginTop =
                      100 * (1 - this.__color.h / 360) + 'px'),
                    (this.__temp.s = 1),
                    (this.__temp.v = 1),
                    u(
                      this.__saturation_field,
                      'left',
                      '#fff',
                      this.__temp.toHexString()
                    ),
                    (this.__input.value = this.__color.toString()),
                    T.extend(this.__input.style, {
                      backgroundColor: this.__color.toHexString(),
                      color: 'rgb(' + n + ',' + n + ',' + n + ')',
                      textShadow:
                        this.__input_textShadow +
                        'rgba(' +
                        i +
                        ',' +
                        i +
                        ',' +
                        i +
                        ',.7)'
                    })
                }
              }
            ]),
            t
          )
        })(),
        oe = ['-moz-', '-o-', '-webkit-', '-ms-', ''],
        re = {
          load: function(e, t) {
            var n = t || document,
              i = n.createElement('link')
            ;(i.type = 'text/css'),
              (i.rel = 'stylesheet'),
              (i.href = e),
              n.getElementsByTagName('head')[0].appendChild(i)
          },
          inject: function(e, t) {
            var n = t || document,
              i = document.createElement('style')
            ;(i.type = 'text/css'), (i.innerHTML = e)
            var o = n.getElementsByTagName('head')[0]
            try {
              o.appendChild(i)
            } catch (e) {}
          }
        },
        se = function(e, t) {
          var n = e[t]
          return T.isArray(arguments[2]) || T.isObject(arguments[2])
            ? new W(e, t, arguments[2])
            : T.isArray(n)
            ? new ee(e, t, {
                min: arguments[2],
                max: arguments[3],
                step: arguments[4]
              })
            : T.isObject(n)
            ? new ne(e, t, '')
            : T.isNumber(n)
            ? T.isNumber(arguments[2]) && T.isNumber(arguments[3])
              ? T.isNumber(arguments[4])
                ? new $(e, t, arguments[2], arguments[3], arguments[4])
                : new $(e, t, arguments[2], arguments[3])
              : T.isNumber(arguments[4])
              ? new q(e, t, {
                  min: arguments[2],
                  max: arguments[3],
                  step: arguments[4]
                })
              : new q(e, t, { min: arguments[2], max: arguments[3] })
            : T.isString(n)
            ? new Q(e, t)
            : T.isFunction(n)
            ? new te(e, t, '')
            : T.isBoolean(n)
            ? new J(e, t)
            : null
        },
        ae =
          window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.oRequestAnimationFrame ||
          window.msRequestAnimationFrame ||
          function(e) {
            setTimeout(e, 1e3 / 60)
          },
        le = (function() {
          function e() {
            D(this, e),
              (this.backgroundElement = document.createElement('div')),
              T.extend(this.backgroundElement.style, {
                backgroundColor: 'rgba(0,0,0,0.8)',
                top: 0,
                left: 0,
                display: 'none',
                zIndex: '1000',
                opacity: 0,
                WebkitTransition: 'opacity 0.2s linear',
                transition: 'opacity 0.2s linear'
              }),
              K.makeFullscreen(this.backgroundElement),
              (this.backgroundElement.style.position = 'fixed'),
              (this.domElement = document.createElement('div')),
              T.extend(this.domElement.style, {
                position: 'fixed',
                display: 'none',
                zIndex: '1001',
                opacity: 0,
                WebkitTransition:
                  '-webkit-transform 0.2s ease-out, opacity 0.2s linear',
                transition: 'transform 0.2s ease-out, opacity 0.2s linear'
              }),
              document.body.appendChild(this.backgroundElement),
              document.body.appendChild(this.domElement)
            var t = this
            K.bind(this.backgroundElement, 'click', function() {
              t.hide()
            })
          }
          return (
            j(e, [
              {
                key: 'show',
                value: function() {
                  var e = this
                  ;(this.backgroundElement.style.display = 'block'),
                    (this.domElement.style.display = 'block'),
                    (this.domElement.style.opacity = 0),
                    (this.domElement.style.webkitTransform = 'scale(1.1)'),
                    this.layout(),
                    T.defer(function() {
                      ;(e.backgroundElement.style.opacity = 1),
                        (e.domElement.style.opacity = 1),
                        (e.domElement.style.webkitTransform = 'scale(1)')
                    })
                }
              },
              {
                key: 'hide',
                value: function() {
                  var e = this,
                    t = function t() {
                      ;(e.domElement.style.display = 'none'),
                        (e.backgroundElement.style.display = 'none'),
                        K.unbind(e.domElement, 'webkitTransitionEnd', t),
                        K.unbind(e.domElement, 'transitionend', t),
                        K.unbind(e.domElement, 'oTransitionEnd', t)
                    }
                  K.bind(this.domElement, 'webkitTransitionEnd', t),
                    K.bind(this.domElement, 'transitionend', t),
                    K.bind(this.domElement, 'oTransitionEnd', t),
                    (this.backgroundElement.style.opacity = 0),
                    (this.domElement.style.opacity = 0),
                    (this.domElement.style.webkitTransform = 'scale(1.1)')
                }
              },
              {
                key: 'layout',
                value: function() {
                  ;(this.domElement.style.left =
                    window.innerWidth / 2 -
                    K.getWidth(this.domElement) / 2 +
                    'px'),
                    (this.domElement.style.top =
                      window.innerHeight / 2 -
                      K.getHeight(this.domElement) / 2 +
                      'px')
                }
              }
            ]),
            e
          )
        })(),
        de = (function(e) {
          if (e && 'undefined' != typeof window) {
            var t = document.createElement('style')
            return (
              t.setAttribute('type', 'text/css'),
              (t.innerHTML = e),
              document.head.appendChild(t),
              e
            )
          }
        })(
          ".dg ul{list-style:none;margin:0;padding:0;width:100%;clear:both}.dg.ac{position:fixed;top:0;left:0;right:0;height:0;z-index:0}.dg:not(.ac) .main{overflow:hidden}.dg.main{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear}.dg.main.taller-than-window{overflow-y:auto}.dg.main.taller-than-window .close-button{opacity:1;margin-top:-1px;border-top:1px solid #2c2c2c}.dg.main ul.closed .close-button{opacity:1 !important}.dg.main:hover .close-button,.dg.main .close-button.drag{opacity:1}.dg.main .close-button{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear;border:0;line-height:19px;height:20px;cursor:pointer;text-align:center;background-color:#000}.dg.main .close-button.close-top{position:relative}.dg.main .close-button.close-bottom{position:absolute}.dg.main .close-button:hover{background-color:#111}.dg.a{float:right;margin-right:15px;overflow-y:visible}.dg.a.has-save>ul.close-top{margin-top:0}.dg.a.has-save>ul.close-bottom{margin-top:27px}.dg.a.has-save>ul.closed{margin-top:0}.dg.a .save-row{top:0;z-index:1002}.dg.a .save-row.close-top{position:relative}.dg.a .save-row.close-bottom{position:fixed}.dg li{-webkit-transition:height .1s ease-out;-o-transition:height .1s ease-out;-moz-transition:height .1s ease-out;transition:height .1s ease-out;-webkit-transition:overflow .1s linear;-o-transition:overflow .1s linear;-moz-transition:overflow .1s linear;transition:overflow .1s linear}.dg li:not(.folder){cursor:auto;height:27px;line-height:27px;padding:0 4px 0 5px}.dg li.folder{padding:0;border-left:4px solid rgba(0,0,0,0)}.dg li.title{cursor:pointer;margin-left:-4px}.dg .closed li:not(.title),.dg .closed ul li,.dg .closed ul li>*{height:0;overflow:hidden;border:0}.dg .cr{clear:both;padding-left:3px;height:27px;overflow:hidden}.dg .property-name{cursor:default;float:left;clear:left;width:40%;overflow:hidden;text-overflow:ellipsis}.dg .c{float:left;width:60%;position:relative}.dg .c input[type=text]{border:0;margin-top:4px;padding:3px;width:100%;float:right}.dg .has-slider input[type=text]{width:25%;margin-left:0}.dg .object input[type=text]{font-size:xx-small;border-left:2px solid}.dg input[type=text].x{border-left-color:#e61d5f}.dg input[type=text].y{border-left-color:#1ed36f}.dg input[type=text].z{border-left-color:#2FA1D6}.dg .slider{float:left;width:66%;margin-left:-5px;margin-right:0;height:19px;margin-top:4px}.dg .slider-fg{height:100%}.dg .c input[type=checkbox]{margin-top:7px}.dg .c select{margin-top:5px}.dg .cr.function,.dg .cr.function .property-name,.dg .cr.function *,.dg .cr.boolean,.dg .cr.boolean *{cursor:pointer}.dg .cr.color{overflow:visible}.dg .selector{display:none;position:absolute;margin-left:-9px;margin-top:23px;z-index:10}.dg .c:hover .selector,.dg .selector.drag{display:block}.dg li.save-row{padding:0}.dg li.save-row .button{display:inline-block;padding:0px 6px}.dg.dialogue{background-color:#222;width:460px;padding:15px;font-size:13px;line-height:15px}#dg-new-constructor{padding:10px;color:#222;font-family:Monaco, monospace;font-size:10px;border:0;resize:none;box-shadow:inset 1px 1px 1px #888;word-wrap:break-word;margin:12px 0;display:block;width:440px;overflow-y:scroll;height:100px;position:relative}#dg-local-explain{display:none;font-size:11px;line-height:17px;border-radius:3px;background-color:#333;padding:8px;margin-top:10px}#dg-local-explain code{font-size:10px}#dat-gui-save-locally{display:none}.dg{color:#eee;font:11px 'Lucida Grande', sans-serif;text-shadow:0 -1px 0 #111}.dg.main::-webkit-scrollbar{width:5px;background:#1a1a1a}.dg.main::-webkit-scrollbar-corner{height:0;display:none}.dg.main::-webkit-scrollbar-thumb{border-radius:5px;background:#676767}.dg li:not(.folder){background:#1a1a1a;border-bottom:1px solid #2c2c2c}.dg li.save-row{line-height:25px;background:#dad5cb;border:0}.dg li.save-row select{margin-left:5px;width:108px}.dg li.save-row .button{margin-left:5px;margin-top:1px;border-radius:2px;font-size:9px;line-height:7px;padding:4px 4px 5px 4px;background:#c5bdad;color:#fff;text-shadow:0 1px 0 #b0a58f;box-shadow:0 -1px 0 #b0a58f;cursor:pointer}.dg li.save-row .button.gears{background:#c5bdad url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAYAAAB/9ZQ7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQJJREFUeNpiYKAU/P//PwGIC/ApCABiBSAW+I8AClAcgKxQ4T9hoMAEUrxx2QSGN6+egDX+/vWT4e7N82AMYoPAx/evwWoYoSYbACX2s7KxCxzcsezDh3evFoDEBYTEEqycggWAzA9AuUSQQgeYPa9fPv6/YWm/Acx5IPb7ty/fw+QZblw67vDs8R0YHyQhgObx+yAJkBqmG5dPPDh1aPOGR/eugW0G4vlIoTIfyFcA+QekhhHJhPdQxbiAIguMBTQZrPD7108M6roWYDFQiIAAv6Aow/1bFwXgis+f2LUAynwoIaNcz8XNx3Dl7MEJUDGQpx9gtQ8YCueB+D26OECAAQDadt7e46D42QAAAABJRU5ErkJggg==) 2px 1px no-repeat;height:7px;width:8px}.dg li.save-row .button:hover{background-color:#bab19e;box-shadow:0 -1px 0 #b0a58f}.dg li.folder{border-bottom:0}.dg li.title{padding-left:16px;background:#000 url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlI+hKgFxoCgAOw==) 6px 10px no-repeat;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.2)}.dg .closed li.title{background-image:url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlGIWqMCbWAEAOw==)}.dg .cr.boolean{border-left:3px solid #806787}.dg .cr.color{border-left:3px solid}.dg .cr.function{border-left:3px solid #e61d5f}.dg .cr.number{border-left:3px solid #2FA1D6}.dg .cr.number input[type=text]{color:#2FA1D6}.dg .cr.object{border-left:3px solid #2FA1D6}.dg .cr.object input[type=text]{color:#2FA1D6}.dg .cr.string{border-left:3px solid #1ed36f}.dg .cr.string input[type=text]{color:#1ed36f}.dg .cr.function:hover,.dg .cr.boolean:hover{background:#111}.dg .c input[type=text]{background:#303030;outline:none}.dg .c input[type=text]:hover{background:#3c3c3c}.dg .c input[type=text]:focus{background:#494949;color:#fff}.dg .c .slider{background:#303030;cursor:ew-resize}.dg .c .slider-fg{background:#2FA1D6;max-width:100%}.dg .c .slider:hover{background:#3c3c3c}.dg .c .slider:hover .slider-fg{background:#44abda}\n"
        )
      re.inject(de)
      var ue = 'Default',
        ce = (function() {
          try {
            return !!window.localStorage
          } catch (e) {
            return !1
          }
        })(),
        _e = void 0,
        he = !0,
        pe = void 0,
        fe = !1,
        me = [],
        be = function e(t) {
          var n = this,
            i = t || {}
          ;(this.domElement = document.createElement('div')),
            (this.__ul = document.createElement('ul')),
            this.domElement.appendChild(this.__ul),
            K.addClass(this.domElement, 'dg'),
            (this.__folders = {}),
            (this.__controllers = []),
            (this.__rememberedObjects = []),
            (this.__rememberedObjectIndecesToControllers = []),
            (this.__listening = []),
            (i = T.defaults(i, {
              closeOnTop: !1,
              autoPlace: !0,
              width: e.DEFAULT_WIDTH
            })),
            (i = T.defaults(i, {
              resizable: i.autoPlace,
              hideable: i.autoPlace
            })),
            T.isUndefined(i.load)
              ? (i.load = { preset: ue })
              : i.preset && (i.load.preset = i.preset),
            T.isUndefined(i.parent) && i.hideable && me.push(this),
            (i.resizable = T.isUndefined(i.parent) && i.resizable),
            i.autoPlace && T.isUndefined(i.scrollable) && (i.scrollable = !0)
          var o = ce && 'true' === localStorage.getItem(g(this, 'isLocal')),
            r = void 0,
            s = void 0
          if (
            (Object.defineProperties(this, {
              parent: {
                get: function() {
                  return i.parent
                }
              },
              scrollable: {
                get: function() {
                  return i.scrollable
                }
              },
              autoPlace: {
                get: function() {
                  return i.autoPlace
                }
              },
              closeOnTop: {
                get: function() {
                  return i.closeOnTop
                }
              },
              preset: {
                get: function() {
                  return n.parent ? n.getRoot().preset : i.load.preset
                },
                set: function(e) {
                  n.parent ? (n.getRoot().preset = e) : (i.load.preset = e),
                    A(this),
                    n.revert()
                }
              },
              width: {
                get: function() {
                  return i.width
                },
                set: function(e) {
                  ;(i.width = e), E(n, e)
                }
              },
              name: {
                get: function() {
                  return i.name
                },
                set: function(e) {
                  ;(i.name = e), s && (s.innerHTML = i.name)
                }
              },
              closed: {
                get: function() {
                  return i.closed
                },
                set: function(t) {
                  ;(i.closed = t),
                    i.closed
                      ? K.addClass(n.__ul, e.CLASS_CLOSED)
                      : K.removeClass(n.__ul, e.CLASS_CLOSED),
                    this.onResize(),
                    n.__closeButton &&
                      (n.__closeButton.innerHTML = t
                        ? e.TEXT_OPEN
                        : e.TEXT_CLOSED)
                }
              },
              load: {
                get: function() {
                  return i.load
                }
              },
              useLocalStorage: {
                get: function() {
                  return o
                },
                set: function(e) {
                  ce &&
                    ((o = e),
                    e
                      ? K.bind(window, 'unload', r)
                      : K.unbind(window, 'unload', r),
                    localStorage.setItem(g(n, 'isLocal'), e))
                }
              }
            }),
            T.isUndefined(i.parent))
          ) {
            if (
              ((this.closed = i.closed || !1),
              K.addClass(this.domElement, e.CLASS_MAIN),
              K.makeSelectable(this.domElement, !1),
              ce && o)
            ) {
              n.useLocalStorage = !0
              var a = localStorage.getItem(g(this, 'gui'))
              a && (i.load = JSON.parse(a))
            }
            ;(this.__closeButton = document.createElement('div')),
              (this.__closeButton.innerHTML = e.TEXT_CLOSED),
              K.addClass(this.__closeButton, e.CLASS_CLOSE_BUTTON),
              i.closeOnTop
                ? (K.addClass(this.__closeButton, e.CLASS_CLOSE_TOP),
                  this.domElement.insertBefore(
                    this.__closeButton,
                    this.domElement.childNodes[0]
                  ))
                : (K.addClass(this.__closeButton, e.CLASS_CLOSE_BOTTOM),
                  this.domElement.appendChild(this.__closeButton)),
              K.bind(this.__closeButton, 'click', function() {
                n.closed = !n.closed
              })
          } else {
            void 0 === i.closed && (i.closed = !0)
            var l = document.createTextNode(i.name)
            K.addClass(l, 'controller-name'), (s = _(n, l))
            K.addClass(this.__ul, e.CLASS_CLOSED),
              K.addClass(s, 'title'),
              K.bind(s, 'click', function(e) {
                return e.preventDefault(), (n.closed = !n.closed), !1
              }),
              i.closed || (this.closed = !1)
          }
          i.autoPlace &&
            (T.isUndefined(i.parent) &&
              (he &&
                ((pe = document.createElement('div')),
                K.addClass(pe, 'dg'),
                K.addClass(pe, e.CLASS_AUTO_PLACE_CONTAINER),
                document.body.appendChild(pe),
                (he = !1)),
              pe.appendChild(this.domElement),
              K.addClass(this.domElement, e.CLASS_AUTO_PLACE)),
            this.parent || E(n, i.width)),
            (this.__resizeHandler = function() {
              n.onResizeDebounced()
            }),
            K.bind(window, 'resize', this.__resizeHandler),
            K.bind(this.__ul, 'webkitTransitionEnd', this.__resizeHandler),
            K.bind(this.__ul, 'transitionend', this.__resizeHandler),
            K.bind(this.__ul, 'oTransitionEnd', this.__resizeHandler),
            this.onResize(),
            i.resizable && x(this),
            (r = function() {
              ce &&
                'true' === localStorage.getItem(g(n, 'isLocal')) &&
                localStorage.setItem(
                  g(n, 'gui'),
                  JSON.stringify(n.getSaveObject())
                )
            }),
            (this.saveToLocalStorageIfPossible = r),
            i.parent ||
              (function() {
                var e = n.getRoot()
                ;(e.width += 1),
                  T.defer(function() {
                    e.width -= 1
                  })
              })()
        }
      ;(be.toggleHide = function() {
        ;(fe = !fe),
          T.each(me, function(e) {
            e.domElement.style.display = fe ? 'none' : ''
          })
      }),
        (be.CLASS_AUTO_PLACE = 'a'),
        (be.CLASS_AUTO_PLACE_CONTAINER = 'ac'),
        (be.CLASS_MAIN = 'main'),
        (be.CLASS_CONTROLLER_ROW = 'cr'),
        (be.CLASS_TOO_TALL = 'taller-than-window'),
        (be.CLASS_CLOSED = 'closed'),
        (be.CLASS_CLOSE_BUTTON = 'close-button'),
        (be.CLASS_CLOSE_TOP = 'close-top'),
        (be.CLASS_CLOSE_BOTTOM = 'close-bottom'),
        (be.CLASS_DRAG = 'drag'),
        (be.DEFAULT_WIDTH = 245),
        (be.TEXT_CLOSED = 'Close Controls'),
        (be.TEXT_OPEN = 'Open Controls'),
        (be._keydownHandler = function(e) {
          'text' === document.activeElement.type ||
            (72 !== e.which && 72 !== e.keyCode) ||
            be.toggleHide()
        }),
        K.bind(window, 'keydown', be._keydownHandler, !1),
        T.extend(be.prototype, {
          add: function(e, t) {
            return b(this, e, t, {
              factoryArgs: Array.prototype.slice.call(arguments, 2)
            })
          },
          addColor: function(e, t) {
            return b(this, e, t, { color: !0 })
          },
          remove: function(e) {
            this.__ul.removeChild(e.__li),
              this.__controllers.splice(this.__controllers.indexOf(e), 1)
            var t = this
            T.defer(function() {
              t.onResize()
            })
          },
          destroy: function() {
            if (this.parent)
              throw new Error(
                'Only the root GUI should be removed with .destroy(). For subfolders, use gui.removeFolder(folder) instead.'
              )
            this.autoPlace && pe.removeChild(this.domElement)
            var e = this
            T.each(this.__folders, function(t) {
              e.removeFolder(t)
            }),
              K.unbind(window, 'keydown', be._keydownHandler, !1),
              h(this)
          },
          addFolder: function(e) {
            if (void 0 !== this.__folders[e])
              throw new Error(
                'You already have a folder in this GUI by the name "' + e + '"'
              )
            var t = { name: e, parent: this }
            ;(t.autoPlace = this.autoPlace),
              this.load &&
                this.load.folders &&
                this.load.folders[e] &&
                ((t.closed = this.load.folders[e].closed),
                (t.load = this.load.folders[e]))
            var n = new be(t)
            this.__folders[e] = n
            var i = _(this, n.domElement)
            return K.addClass(i, 'folder'), n
          },
          removeFolder: function(e) {
            this.__ul.removeChild(e.domElement.parentElement),
              delete this.__folders[e.name],
              this.load &&
                this.load.folders &&
                this.load.folders[e.name] &&
                delete this.load.folders[e.name],
              h(e)
            var t = this
            T.each(e.__folders, function(t) {
              e.removeFolder(t)
            }),
              T.defer(function() {
                t.onResize()
              })
          },
          open: function() {
            this.closed = !1
          },
          close: function() {
            this.closed = !0
          },
          hide: function() {
            this.domElement.style.display = 'none'
          },
          show: function() {
            this.domElement.style.display = ''
          },
          onResize: function() {
            var e = this.getRoot()
            if (e.scrollable) {
              var t = K.getOffset(e.__ul).top,
                n = 0
              T.each(e.__ul.childNodes, function(t) {
                ;(e.autoPlace && t === e.__save_row) || (n += K.getHeight(t))
              }),
                window.innerHeight - t - 20 < n
                  ? (K.addClass(e.domElement, be.CLASS_TOO_TALL),
                    (e.__ul.style.height = window.innerHeight - t - 20 + 'px'))
                  : (K.removeClass(e.domElement, be.CLASS_TOO_TALL),
                    (e.__ul.style.height = 'auto'))
            }
            e.__resize_handle &&
              T.defer(function() {
                e.__resize_handle.style.height = e.__ul.offsetHeight + 'px'
              }),
              e.__closeButton && (e.__closeButton.style.width = e.width + 'px')
          },
          onResizeDebounced: T.debounce(function() {
            this.onResize()
          }, 50),
          remember: function() {
            if (
              (T.isUndefined(_e) &&
                ((_e = new le()).domElement.innerHTML =
                  '<div id="dg-save" class="dg dialogue">\n\n  Here\'s the new load parameter for your <code>GUI</code>\'s constructor:\n\n  <textarea id="dg-new-constructor"></textarea>\n\n  <div id="dg-save-locally">\n\n    <input id="dg-local-storage" type="checkbox"/> Automatically save\n    values to <code>localStorage</code> on exit.\n\n    <div id="dg-local-explain">The values saved to <code>localStorage</code> will\n      override those passed to <code>dat.GUI</code>\'s constructor. This makes it\n      easier to work incrementally, but <code>localStorage</code> is fragile,\n      and your friends may not see the same values you do.\n\n    </div>\n\n  </div>\n\n</div>'),
              this.parent)
            )
              throw new Error('You can only call remember on a top level GUI.')
            var e = this
            T.each(Array.prototype.slice.call(arguments), function(t) {
              0 === e.__rememberedObjects.length && w(e),
                -1 === e.__rememberedObjects.indexOf(t) &&
                  e.__rememberedObjects.push(t)
            }),
              this.autoPlace && E(this, this.width)
          },
          getRoot: function() {
            for (var e = this; e.parent; ) e = e.parent
            return e
          },
          getSaveObject: function() {
            var e = this.load
            return (
              (e.closed = this.closed),
              this.__rememberedObjects.length > 0 &&
                ((e.preset = this.preset),
                e.remembered || (e.remembered = {}),
                (e.remembered[this.preset] = C(this))),
              (e.folders = {}),
              T.each(this.__folders, function(t, n) {
                e.folders[n] = t.getSaveObject()
              }),
              e
            )
          },
          save: function() {
            this.load.remembered || (this.load.remembered = {}),
              (this.load.remembered[this.preset] = C(this)),
              p(this, !1),
              this.saveToLocalStorageIfPossible()
          },
          saveAs: function(e) {
            this.load.remembered ||
              ((this.load.remembered = {}),
              (this.load.remembered[ue] = C(this, !0))),
              (this.load.remembered[e] = C(this)),
              (this.preset = e),
              v(this, e, !0),
              this.saveToLocalStorageIfPossible()
          },
          revert: function(e) {
            T.each(
              this.__controllers,
              function(t) {
                this.getRoot().load.remembered
                  ? m(e || this.getRoot(), t)
                  : t.setValue(t.initialValue),
                  t.__onFinishChange && t.__onFinishChange.call(t, t.getValue())
              },
              this
            ),
              T.each(this.__folders, function(e) {
                e.revert(e)
              }),
              e || p(this.getRoot(), !1)
          },
          listen: function(e) {
            var t = 0 === this.__listening.length
            this.__listening.push(e), t && k(this.__listening)
          },
          updateDisplay: function() {
            T.each(this.__controllers, function(e) {
              e.updateDisplay()
            }),
              T.each(this.__folders, function(e) {
                e.updateDisplay()
              })
          }
        })
      var ge = { Color: I, math: H, interpret: B },
        ve = {
          Controller: G,
          BooleanController: J,
          OptionController: W,
          StringController: Q,
          NumberController: Z,
          NumberControllerBox: q,
          NumberControllerSlider: $,
          VectorControllerBox: ee,
          FunctionController: te,
          MultiFunctionController: ne,
          ColorController: ie
        },
        ye = { dom: K },
        we = { GUI: be },
        xe = be,
        Ee = { color: ge, controllers: ve, dom: ye, gui: we, GUI: xe }
      ;(e.color = ge),
        (e.controllers = ve),
        (e.dom = ye),
        (e.gui = we),
        (e.GUI = xe),
        (e.default = Ee),
        Object.defineProperty(e, '__esModule', { value: !0 })
    })

    // "./thirdParty/threejs/controls/DiaLuxControls.js"
    // console.log('@@@@13 DiaLuxControls')
    /**
     * @author qiao / https://github.com/qiao
     * @author mrdoob / http://mrdoob.com
     * @author alteredq / http://alteredqualia.com/
     * @author WestLangley / http://github.com/WestLangley
     * @author erich666 / http://erichaines.com
     */

    // This set of controls performs orbiting, dollying (zooming), and panning.
    // Unlike TrackballControls, it maintains the "up" direction object.up (+Y by default).
    //
    //    Orbit - left mouse / touch: one-finger move
    //    Zoom - middle mouse, or mousewheel / touch: two-finger spread or squish
    //    Pan - right mouse, or left mouse + ctrl/meta/shiftKey, or arrow keys / touch: two-finger move

    THREE.OrbitControls = function(object, domElement) {
      this.object = object

      this.domElement = domElement !== undefined ? domElement : document

      // Set to false to disable this control
      this.enabled = true

      // "target" sets the location of focus, where the object orbits around
      this.target = new THREE.Vector3()

      // How far you can dolly in and out ( PerspectiveCamera only )
      this.minDistance = 0
      this.maxDistance = Infinity

      // How far you can zoom in and out ( OrthographicCamera only )
      this.minZoom = 0
      this.maxZoom = Infinity

      // How far you can orbit vertically, upper and lower limits.
      // Range is 0 to Math.PI radians.
      this.minPolarAngle = 0 // radians
      this.maxPolarAngle = Math.PI // radians

      // How far you can orbit horizontally, upper and lower limits.
      // If set, must be a sub-interval of the interval [ - Math.PI, Math.PI ].
      this.minAzimuthAngle = -Infinity // radians
      this.maxAzimuthAngle = Infinity // radians

      // Set to true to enable damping (inertia)
      // If damping is enabled, you must call controls.update() in your animation loop
      this.enableDamping = false
      this.dampingFactor = 0.25

      // This option actually enables dollying in and out; left as "zoom" for backwards compatibility.
      // Set to false to disable zooming
      this.enableZoom = true
      this.zoomSpeed = 1.0

      // Set to false to disable rotating
      this.enableRotate = true
      this.rotateSpeed = 1.0

      // Set to false to disable panning
      this.enablePan = true
      this.panSpeed = 1.0
      this.screenSpacePanning = false // if true, pan in screen-space
      this.keyPanSpeed = 20.0 // pixels moved per arrow key push

      // Set to true to automatically rotate around the target
      // If auto-rotate is enabled, you must call controls.update() in your animation loop
      this.autoRotate = false
      this.autoRotateSpeed = 2.0 // 30 seconds per round when fps is 60

      // Set to false to disable use of the keys
      this.enableKeys = true

      // The four arrow keys
      //this.keys = { LEFT: 37, UP: 38, RIGHT: 39, BOTTOM: 40 };
      this.keys = {
        LEFT: 65 /** A */,
        UP: 87 /** W */,
        RIGHT: 68 /** D */,
        BOTTOM: 83 /** S */
      }

      // Mouse buttons
      this.mouseButtons = {
        LEFT: THREE.MOUSE.LEFT,
        MIDDLE: THREE.MOUSE.MIDDLE,
        RIGHT: THREE.MOUSE.RIGHT
      }

      // for reset
      this.target0 = this.target.clone()
      this.position0 = this.object.position.clone()
      this.zoom0 = this.object.zoom

      //
      // public methods
      //

      this.getPolarAngle = function() {
        return spherical.phi
      }

      this.getAzimuthalAngle = function() {
        return spherical.theta
      }

      this.saveState = function() {
        scope.target0.copy(scope.target)
        scope.position0.copy(scope.object.position)
        scope.zoom0 = scope.object.zoom
      }

      this.reset = function() {
        scope.target.copy(scope.target0)
        scope.object.position.copy(scope.position0)
        scope.object.zoom = scope.zoom0

        scope.object.updateProjectionMatrix()
        scope.dispatchEvent(changeEvent)

        scope.update()

        state = STATE.NONE
      }

      // this method is exposed, but perhaps it would be better if we can make it private...
      this.update = (function() {
        var offset = new THREE.Vector3()

        // so camera.up is the orbit axis
        var quat = new THREE.Quaternion().setFromUnitVectors(
          object.up,
          new THREE.Vector3(0, 1, 0)
        )
        var quatInverse = quat.clone().inverse()

        var lastPosition = new THREE.Vector3()
        var lastQuaternion = new THREE.Quaternion()

        return function update() {
          var position = scope.object.position

          if (state === STATE.CAMERA_ROTATE) {
            offset.copy(scope.target).sub(position)
          } else {
            offset.copy(position).sub(scope.target)
          }

          // rotate offset to "y-axis-is-up" space
          offset.applyQuaternion(quat)

          // angle from z-axis around y-axis
          spherical.setFromVector3(offset)

          if (scope.autoRotate && state === STATE.NONE) {
            rotateLeft(getAutoRotationAngle())
          }

          spherical.theta += sphericalDelta.theta
          spherical.phi += sphericalDelta.phi

          // restrict theta to be between desired limits
          spherical.theta = Math.max(
            scope.minAzimuthAngle,
            Math.min(scope.maxAzimuthAngle, spherical.theta)
          )

          // restrict phi to be between desired limits
          spherical.phi = Math.max(
            scope.minPolarAngle,
            Math.min(scope.maxPolarAngle, spherical.phi)
          )

          spherical.makeSafe()

          spherical.radius *= scale

          // restrict radius to be between desired limits
          spherical.radius = Math.max(
            scope.minDistance,
            Math.min(scope.maxDistance, spherical.radius)
          )

          // move target to panned location
          scope.target.add(panOffset)

          offset.setFromSpherical(spherical)

          // rotate offset back to "camera-up-vector-is-up" space
          offset.applyQuaternion(quatInverse)

          if (state === STATE.CAMERA_ROTATE) {
            position.add(panOffset)
            scope.target.setFromSpherical(spherical).add(position)
          } else {
            position.copy(scope.target).add(offset)
          }

          scope.object.lookAt(scope.target)

          if (scope.enableDamping === true) {
            sphericalDelta.theta *= 1 - scope.dampingFactor
            sphericalDelta.phi *= 1 - scope.dampingFactor

            panOffset.multiplyScalar(1 - scope.dampingFactor)
          } else {
            sphericalDelta.set(0, 0, 0)

            panOffset.set(0, 0, 0)
          }

          scale = 1

          // update condition is:
          // min(camera displacement, camera rotation in radians)^2 > EPS
          // using small-angle approximation cos(x/2) = 1 - x^2 / 8

          if (
            zoomChanged ||
            lastPosition.distanceToSquared(scope.object.position) > EPS ||
            8 * (1 - lastQuaternion.dot(scope.object.quaternion)) > EPS
          ) {
            scope.dispatchEvent(changeEvent)

            lastPosition.copy(scope.object.position)
            lastQuaternion.copy(scope.object.quaternion)
            zoomChanged = false

            return true
          }

          return false
        }
      })()

      this.dispose = function() {
        scope.domElement.removeEventListener(
          'contextmenu',
          onContextMenu,
          false
        )
        scope.domElement.removeEventListener('mousedown', onMouseDown, false)
        scope.domElement.removeEventListener('wheel', onMouseWheel, false)

        scope.domElement.removeEventListener('touchstart', onTouchStart, false)
        scope.domElement.removeEventListener('touchend', onTouchEnd, false)
        scope.domElement.removeEventListener('touchmove', onTouchMove, false)

        document.removeEventListener('mousemove', onMouseMove, false)
        document.removeEventListener('mouseup', onMouseUp, false)

        window.removeEventListener('keydown', onKeyDown, false)

        //scope.dispatchEvent( { type: 'dispose' } ); // should this be added here?
      }

      //
      // internals
      //

      var scope = this

      var changeEvent = { type: 'change' }
      var startEvent = { type: 'start' }
      var endEvent = { type: 'end' }

      var STATE = {
        NONE: -1,
        ROTATE: 0,
        DOLLY: 1,
        PAN: 2,
        TOUCH_ROTATE: 3,
        TOUCH_DOLLY_PAN: 4,
        CAMERA_ROTATE: 5
      }

      var state = STATE.NONE

      var EPS = 0.000001

      // current position in spherical coordinates
      var spherical = new THREE.Spherical()
      var sphericalDelta = new THREE.Spherical()

      var scale = 1
      var panOffset = new THREE.Vector3()
      var zoomChanged = false

      var rotateStart = new THREE.Vector2()
      var rotateEnd = new THREE.Vector2()
      var rotateDelta = new THREE.Vector2()

      var panStart = new THREE.Vector2()
      var panEnd = new THREE.Vector2()
      var panDelta = new THREE.Vector2()

      var dollyStart = new THREE.Vector2()
      var dollyEnd = new THREE.Vector2()
      var dollyDelta = new THREE.Vector2()

      function getAutoRotationAngle() {
        return ((2 * Math.PI) / 60 / 60) * scope.autoRotateSpeed
      }

      function getZoomScale() {
        return Math.pow(0.95, scope.zoomSpeed)
      }

      function rotateLeft(angle) {
        sphericalDelta.theta -= angle
      }

      function rotateUp(angle) {
        sphericalDelta.phi -= angle
      }

      var panLeft = (function() {
        var v = new THREE.Vector3()

        return function panLeft(distance, objectMatrix) {
          v.setFromMatrixColumn(objectMatrix, 0) // get X column of objectMatrix
          v.multiplyScalar(-distance)

          panOffset.add(v)
        }
      })()

      var panForward = (function() {
        var v = new THREE.Vector3()
        return function panForward(distance, objectMatrix) {
          v.setFromMatrixColumn(objectMatrix, 2) // get Z column of objectMatrix
          v.multiplyScalar(-distance)

          panOffset.add(v)
        }
      })()

      var panUp = (function() {
        var v = new THREE.Vector3()

        return function panUp(distance, objectMatrix) {
          if (
            scope.screenSpacePanning === true ||
            state !== STATE.CAMERA_ROTATE
          ) {
            v.setFromMatrixColumn(objectMatrix, 1)
          } else {
            v.setFromMatrixColumn(objectMatrix, 0)
            v.crossVectors(scope.object.up, v)
          }

          v.multiplyScalar(distance)

          panOffset.add(v)
        }
      })()

      // deltaX and deltaY are in pixels; right and down are positive
      var pan = (function() {
        var offset = new THREE.Vector3()

        return function pan(deltaX, deltaY, deltaZ = 0) {
          var element =
            scope.domElement === document
              ? scope.domElement.body
              : scope.domElement

          if (scope.object.isPerspectiveCamera) {
            // perspective
            var position = scope.object.position
            offset.copy(position).sub(scope.target)
            var targetDistance = offset.length()

            // half of the fov is center to top of screen
            targetDistance *= Math.tan(
              ((scope.object.fov / 2) * Math.PI) / 180.0
            )

            // we use only clientHeight here so aspect ratio does not distort speed
            panLeft(
              (2 * deltaX * targetDistance) / element.clientHeight,
              scope.object.matrix
            )
            panUp(
              (2 * deltaY * targetDistance) / element.clientHeight,
              scope.object.matrix
            )
            panForward(
              (2 * deltaZ * targetDistance) / element.clientHeight,
              scope.object.matrix
            )
          } else if (scope.object.isOrthographicCamera) {
            // orthographic
            panLeft(
              (deltaX * (scope.object.right - scope.object.left)) /
                scope.object.zoom /
                element.clientWidth,
              scope.object.matrix
            )
            panUp(
              (deltaY * (scope.object.top - scope.object.bottom)) /
                scope.object.zoom /
                element.clientHeight,
              scope.object.matrix
            )
          } else {
            // camera neither orthographic nor perspective
            console.warn(
              'WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.'
            )
            scope.enablePan = false
          }
        }
      })()

      function dollyIn(dollyScale) {
        if (scope.object.isPerspectiveCamera) {
          scale /= dollyScale
        } else if (scope.object.isOrthographicCamera) {
          scope.object.zoom = Math.max(
            scope.minZoom,
            Math.min(scope.maxZoom, scope.object.zoom * dollyScale)
          )
          scope.object.updateProjectionMatrix()
          zoomChanged = true
        } else {
          console.warn(
            'WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.'
          )
          scope.enableZoom = false
        }
      }

      function dollyOut(dollyScale) {
        if (scope.object.isPerspectiveCamera) {
          scale *= dollyScale
        } else if (scope.object.isOrthographicCamera) {
          scope.object.zoom = Math.max(
            scope.minZoom,
            Math.min(scope.maxZoom, scope.object.zoom / dollyScale)
          )
          scope.object.updateProjectionMatrix()
          zoomChanged = true
        } else {
          console.warn(
            'WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.'
          )
          scope.enableZoom = false
        }
      }

      //
      // event callbacks - update the object state
      //

      function handleMouseDownRotate(event) {
        //console.log( 'handleMouseDownRotate' );

        rotateStart.set(event.clientX, event.clientY)
      }

      function handleMouseDownCameraRotate(event) {
        //console.log( 'handleMouseDownRotate' );

        rotateStart.set(event.clientX, event.clientY)
        panStart.set(event.clientX, event.clientY)
      }

      function handleMouseDownDolly(event) {
        //console.log( 'handleMouseDownDolly' );

        dollyStart.set(event.clientX, event.clientY)
      }

      function handleMouseDownPan(event) {
        //console.log( 'handleMouseDownPan' );

        panStart.set(event.clientX, event.clientY)
      }

      function handleMouseMoveRotate(event) {
        //console.log( 'handleMouseMoveRotate' );

        rotateEnd.set(event.clientX, event.clientY)

        rotateDelta
          .subVectors(rotateEnd, rotateStart)
          .multiplyScalar(scope.rotateSpeed)

        var element =
          scope.domElement === document
            ? scope.domElement.body
            : scope.domElement

        rotateLeft((2 * Math.PI * rotateDelta.x) / element.clientHeight) // yes, height

        rotateUp((2 * Math.PI * rotateDelta.y) / element.clientHeight)

        rotateStart.copy(rotateEnd)

        scope.update()
      }

      function handleMouseMoveCameraRotate(event) {
        //console.log( 'handleMouseMoveRotate' );

        rotateEnd.set(event.clientX, event.clientY)

        rotateDelta
          .subVectors(rotateEnd, rotateStart)
          .multiplyScalar(scope.rotateSpeed * 0.5)

        var element =
          scope.domElement === document
            ? scope.domElement.body
            : scope.domElement

        rotateLeft((2 * Math.PI * rotateDelta.x) / element.clientHeight) // yes, height

        //rotateUp(2 * Math.PI * rotateDelta.y / element.clientHeight);

        rotateStart.copy(rotateEnd)

        panEnd.set(event.clientX, event.clientY)

        panDelta.subVectors(panEnd, panStart).multiplyScalar(scope.panSpeed)

        pan(0, -panDelta.y)

        panStart.copy(panEnd)

        scope.update()
      }

      function handleMouseMoveDolly(event) {
        //console.log( 'handleMouseMoveDolly' );

        dollyEnd.set(event.clientX, event.clientY)

        dollyDelta.subVectors(dollyEnd, dollyStart)

        if (dollyDelta.y > 0) {
          dollyIn(getZoomScale())
        } else if (dollyDelta.y < 0) {
          dollyOut(getZoomScale())
        }

        dollyStart.copy(dollyEnd)

        scope.update()
      }

      function handleMouseMovePan(event) {
        //console.log( 'handleMouseMovePan' );

        panEnd.set(event.clientX, event.clientY)

        panDelta.subVectors(panEnd, panStart).multiplyScalar(scope.panSpeed)

        pan(panDelta.x, panDelta.y)

        panStart.copy(panEnd)

        scope.update()
      }

      function handleMouseUp(event) {
        // console.log( 'handleMouseUp' );
      }

      function handleMouseWheel(event) {
        // console.log( 'handleMouseWheel' );

        if (event.deltaY < 0) {
          dollyOut(getZoomScale())
        } else if (event.deltaY > 0) {
          dollyIn(getZoomScale())
        }

        scope.update()
      }

      function handleKeyDown(event) {
        // console.log( 'handleKeyDown' );

        var needsUpdate = false

        switch (event.keyCode) {
          case scope.keys.UP:
            pan(0, 0, scope.keyPanSpeed)
            needsUpdate = true
            break

          case scope.keys.BOTTOM:
            pan(0, 0, -scope.keyPanSpeed)
            needsUpdate = true
            break

          case scope.keys.LEFT:
            pan(scope.keyPanSpeed, 0)
            needsUpdate = true
            break

          case scope.keys.RIGHT:
            pan(-scope.keyPanSpeed, 0)
            needsUpdate = true
            break
        }

        if (needsUpdate) {
          // prevent the browser from scrolling on cursor keys
          event.preventDefault()

          scope.update()
        }
      }

      function handleTouchStartRotate(event) {
        //console.log( 'handleTouchStartRotate' );

        rotateStart.set(event.touches[0].pageX, event.touches[0].pageY)
      }

      function handleTouchStartDollyPan(event) {
        //console.log( 'handleTouchStartDollyPan' );

        if (scope.enableZoom) {
          var dx = event.touches[0].pageX - event.touches[1].pageX
          var dy = event.touches[0].pageY - event.touches[1].pageY

          var distance = Math.sqrt(dx * dx + dy * dy)

          dollyStart.set(0, distance)
        }

        if (scope.enablePan) {
          var x = 0.5 * (event.touches[0].pageX + event.touches[1].pageX)
          var y = 0.5 * (event.touches[0].pageY + event.touches[1].pageY)

          panStart.set(x, y)
        }
      }

      function handleTouchMoveRotate(event) {
        //console.log( 'handleTouchMoveRotate' );

        rotateEnd.set(event.touches[0].pageX, event.touches[0].pageY)

        rotateDelta
          .subVectors(rotateEnd, rotateStart)
          .multiplyScalar(scope.rotateSpeed)

        var element =
          scope.domElement === document
            ? scope.domElement.body
            : scope.domElement

        rotateLeft((2 * Math.PI * rotateDelta.x) / element.clientHeight) // yes, height

        rotateUp((2 * Math.PI * rotateDelta.y) / element.clientHeight)

        rotateStart.copy(rotateEnd)

        scope.update()
      }

      function handleTouchMoveDollyPan(event) {
        //console.log( 'handleTouchMoveDollyPan' );

        if (scope.enableZoom) {
          var dx = event.touches[0].pageX - event.touches[1].pageX
          var dy = event.touches[0].pageY - event.touches[1].pageY

          var distance = Math.sqrt(dx * dx + dy * dy)

          dollyEnd.set(0, distance)

          dollyDelta.set(
            0,
            Math.pow(dollyEnd.y / dollyStart.y, scope.zoomSpeed)
          )

          dollyIn(dollyDelta.y)

          dollyStart.copy(dollyEnd)
        }

        if (scope.enablePan) {
          var x = 0.5 * (event.touches[0].pageX + event.touches[1].pageX)
          var y = 0.5 * (event.touches[0].pageY + event.touches[1].pageY)

          panEnd.set(x, y)

          panDelta.subVectors(panEnd, panStart).multiplyScalar(scope.panSpeed)

          pan(panDelta.x, panDelta.y)

          panStart.copy(panEnd)
        }

        scope.update()
      }

      function handleTouchEnd(event) {
        //console.log( 'handleTouchEnd' );
      }

      //
      // event handlers - FSM: listen for events and reset state
      //

      function onMouseDown(event) {
        if (scope.enabled === false) return

        // Prevent the browser from scrolling.

        event.preventDefault()

        // Manually set the focus since calling preventDefault above
        // prevents the browser from setting it automatically.

        scope.domElement.focus ? scope.domElement.focus() : window.focus()

        switch (event.button) {
          case scope.mouseButtons.LEFT:
            if (event.ctrlKey || event.metaKey || event.shiftKey) {
              if (scope.enablePan === false) return

              handleMouseDownPan(event)

              state = STATE.PAN
            } else {
              if (scope.enableRotate === false) return

              handleMouseDownRotate(event)

              state = STATE.ROTATE
            }

            break

          case scope.mouseButtons.MIDDLE:
            // if ( scope.enableZoom === false ) return;

            // handleMouseDownDolly( event );

            // state = STATE.DOLLY;

            // break;

            if (scope.enablePan === false) return

            handleMouseDownPan(event)

            state = STATE.PAN

            break

          case scope.mouseButtons.RIGHT:
            if (scope.enableRotate === false) return

            handleMouseDownCameraRotate(event)

            state = STATE.CAMERA_ROTATE

            break
        }

        if (state !== STATE.NONE) {
          document.addEventListener('mousemove', onMouseMove, false)
          document.addEventListener('mouseup', onMouseUp, false)

          scope.dispatchEvent(startEvent)
        }
      }

      function onMouseMove(event) {
        if (scope.enabled === false) return

        event.preventDefault()

        switch (state) {
          case STATE.ROTATE:
            if (scope.enableRotate === false) return

            handleMouseMoveRotate(event)

            break

          case STATE.DOLLY:
            if (scope.enableZoom === false) return

            handleMouseMoveDolly(event)

            break

          case STATE.PAN:
            if (scope.enablePan === false) return

            handleMouseMovePan(event)

            break

          case STATE.CAMERA_ROTATE:
            if (scope.enableRotate === false) return

            handleMouseMoveCameraRotate(event)

            break
        }
      }

      function onMouseUp(event) {
        if (scope.enabled === false) return

        handleMouseUp(event)

        document.removeEventListener('mousemove', onMouseMove, false)
        document.removeEventListener('mouseup', onMouseUp, false)

        scope.dispatchEvent(endEvent)

        state = STATE.NONE
      }

      function onMouseWheel(event) {
        if (
          scope.enabled === false ||
          scope.enableZoom === false ||
          (state !== STATE.NONE && state !== STATE.ROTATE)
        )
          return

        event.preventDefault()
        event.stopPropagation()

        scope.dispatchEvent(startEvent)

        handleMouseWheel(event)

        scope.dispatchEvent(endEvent)
      }

      function onKeyDown(event) {
        if (
          scope.enabled === false ||
          scope.enableKeys === false ||
          scope.enablePan === false
        )
          return

        handleKeyDown(event)
      }

      function onTouchStart(event) {
        if (scope.enabled === false) return

        event.preventDefault()

        switch (event.touches.length) {
          case 1: // one-fingered touch: rotate
            if (scope.enableRotate === false) return

            handleTouchStartRotate(event)

            state = STATE.TOUCH_ROTATE

            break

          case 2: // two-fingered touch: dolly-pan
            if (scope.enableZoom === false && scope.enablePan === false) return

            handleTouchStartDollyPan(event)

            state = STATE.TOUCH_DOLLY_PAN

            break

          default:
            state = STATE.NONE
        }

        if (state !== STATE.NONE) {
          scope.dispatchEvent(startEvent)
        }
      }

      function onTouchMove(event) {
        if (scope.enabled === false) return

        event.preventDefault()
        event.stopPropagation()

        switch (event.touches.length) {
          case 1: // one-fingered touch: rotate
            if (scope.enableRotate === false) return
            if (state !== STATE.TOUCH_ROTATE) return // is this needed?

            handleTouchMoveRotate(event)

            break

          case 2: // two-fingered touch: dolly-pan
            if (scope.enableZoom === false && scope.enablePan === false) return
            if (state !== STATE.TOUCH_DOLLY_PAN) return // is this needed?

            handleTouchMoveDollyPan(event)

            break

          default:
            state = STATE.NONE
        }
      }

      function onTouchEnd(event) {
        if (scope.enabled === false) return

        handleTouchEnd(event)

        scope.dispatchEvent(endEvent)

        state = STATE.NONE
      }

      function onContextMenu(event) {
        if (scope.enabled === false) return

        event.preventDefault()
      }

      //

      scope.domElement.addEventListener('contextmenu', onContextMenu, false)

      scope.domElement.addEventListener('mousedown', onMouseDown, false)
      scope.domElement.addEventListener('wheel', onMouseWheel, false)

      scope.domElement.addEventListener('touchstart', onTouchStart, false)
      scope.domElement.addEventListener('touchend', onTouchEnd, false)
      scope.domElement.addEventListener('touchmove', onTouchMove, false)

      window.addEventListener('keydown', onKeyDown, false)

      // force an update at start

      this.update()
    }

    THREE.OrbitControls.prototype = Object.create(
      THREE.EventDispatcher.prototype
    )
    THREE.OrbitControls.prototype.constructor = THREE.OrbitControls

    Object.defineProperties(THREE.OrbitControls.prototype, {
      center: {
        get: function() {
          console.warn(
            'THREE.OrbitControls: .center has been renamed to .target'
          )
          return this.target
        }
      },

      // backward compatibility

      noZoom: {
        get: function() {
          console.warn(
            'THREE.OrbitControls: .noZoom has been deprecated. Use .enableZoom instead.'
          )
          return !this.enableZoom
        },

        set: function(value) {
          console.warn(
            'THREE.OrbitControls: .noZoom has been deprecated. Use .enableZoom instead.'
          )
          this.enableZoom = !value
        }
      },

      noRotate: {
        get: function() {
          console.warn(
            'THREE.OrbitControls: .noRotate has been deprecated. Use .enableRotate instead.'
          )
          return !this.enableRotate
        },

        set: function(value) {
          console.warn(
            'THREE.OrbitControls: .noRotate has been deprecated. Use .enableRotate instead.'
          )
          this.enableRotate = !value
        }
      },

      noPan: {
        get: function() {
          console.warn(
            'THREE.OrbitControls: .noPan has been deprecated. Use .enablePan instead.'
          )
          return !this.enablePan
        },

        set: function(value) {
          console.warn(
            'THREE.OrbitControls: .noPan has been deprecated. Use .enablePan instead.'
          )
          this.enablePan = !value
        }
      },

      noKeys: {
        get: function() {
          console.warn(
            'THREE.OrbitControls: .noKeys has been deprecated. Use .enableKeys instead.'
          )
          return !this.enableKeys
        },

        set: function(value) {
          console.warn(
            'THREE.OrbitControls: .noKeys has been deprecated. Use .enableKeys instead.'
          )
          this.enableKeys = !value
        }
      },

      staticMoving: {
        get: function() {
          console.warn(
            'THREE.OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead.'
          )
          return !this.enableDamping
        },

        set: function(value) {
          console.warn(
            'THREE.OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead.'
          )
          this.enableDamping = !value
        }
      },

      dynamicDampingFactor: {
        get: function() {
          console.warn(
            'THREE.OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead.'
          )
          return this.dampingFactor
        },

        set: function(value) {
          console.warn(
            'THREE.OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead.'
          )
          this.dampingFactor = value
        }
      }
    })

    // "./thirdParty/threejs/controls/TransformControls.js"
    // console.log('@@@@14 TransformControls')
    /**
     * @author arodic / https://github.com/arodic
     */

    THREE.TransformControls = function(camera, domElement) {
      THREE.Object3D.call(this)

      domElement = domElement !== undefined ? domElement : document

      this.visible = false

      var _gizmo = new THREE.TransformControlsGizmo()
      this.add(_gizmo)

      var _plane = new THREE.TransformControlsPlane()
      this.add(_plane)

      var scope = this

      // Define properties with getters/setter
      // Setting the defined property will automatically trigger change event
      // Defined properties are passed down to gizmo and plane

      defineProperty('camera', camera)
      defineProperty('object', undefined)
      defineProperty('enabled', true)
      defineProperty('axis', null)
      defineProperty('mode', 'translate')
      defineProperty('translationSnap', null)
      defineProperty('rotationSnap', null)
      defineProperty('space', 'world')
      defineProperty('size', 1)
      defineProperty('dragging', false)
      defineProperty('showX', true)
      defineProperty('showY', true)
      defineProperty('showZ', true)

      var changeEvent = { type: 'change' }
      var mouseDownEvent = { type: 'mouseDown' }
      var mouseUpEvent = { type: 'mouseUp', mode: scope.mode }
      var objectChangeEvent = { type: 'objectChange' }

      // Reusable utility variables

      var ray = new THREE.Raycaster()

      var _tempVector = new THREE.Vector3()
      var _tempVector2 = new THREE.Vector3()
      var _tempQuaternion = new THREE.Quaternion()
      var _unit = {
        X: new THREE.Vector3(1, 0, 0),
        Y: new THREE.Vector3(0, 1, 0),
        Z: new THREE.Vector3(0, 0, 1)
      }
      var _identityQuaternion = new THREE.Quaternion()
      var _alignVector = new THREE.Vector3()

      var pointStart = new THREE.Vector3()
      var pointEnd = new THREE.Vector3()
      var offset = new THREE.Vector3()
      var rotationAxis = new THREE.Vector3()
      var startNorm = new THREE.Vector3()
      var endNorm = new THREE.Vector3()
      var rotationAngle = 0

      var cameraPosition = new THREE.Vector3()
      var cameraQuaternion = new THREE.Quaternion()
      var cameraScale = new THREE.Vector3()

      var parentPosition = new THREE.Vector3()
      var parentQuaternion = new THREE.Quaternion()
      var parentQuaternionInv = new THREE.Quaternion()
      var parentScale = new THREE.Vector3()

      var worldPositionStart = new THREE.Vector3()
      var worldQuaternionStart = new THREE.Quaternion()
      var worldScaleStart = new THREE.Vector3()

      var worldPosition = new THREE.Vector3()
      var worldQuaternion = new THREE.Quaternion()
      var worldQuaternionInv = new THREE.Quaternion()
      var worldScale = new THREE.Vector3()

      var eye = new THREE.Vector3()

      var positionStart = new THREE.Vector3()
      var quaternionStart = new THREE.Quaternion()
      var scaleStart = new THREE.Vector3()

      // TODO: remove properties unused in plane and gizmo

      defineProperty('worldPosition', worldPosition)
      defineProperty('worldPositionStart', worldPositionStart)
      defineProperty('worldQuaternion', worldQuaternion)
      defineProperty('worldQuaternionStart', worldQuaternionStart)
      defineProperty('cameraPosition', cameraPosition)
      defineProperty('cameraQuaternion', cameraQuaternion)
      defineProperty('pointStart', pointStart)
      defineProperty('pointEnd', pointEnd)
      defineProperty('rotationAxis', rotationAxis)
      defineProperty('rotationAngle', rotationAngle)
      defineProperty('eye', eye)

      {
        domElement.addEventListener('mousedown', onPointerDown, false)
        domElement.addEventListener('touchstart', onPointerDown, false)
        domElement.addEventListener('mousemove', onPointerHover, false)
        domElement.addEventListener('touchmove', onPointerHover, false)
        domElement.addEventListener('touchmove', onPointerMove, false)
        document.addEventListener('mouseup', onPointerUp, false)
        domElement.addEventListener('touchend', onPointerUp, false)
        domElement.addEventListener('touchcancel', onPointerUp, false)
        domElement.addEventListener('touchleave', onPointerUp, false)
      }

      this.dispose = function() {
        domElement.removeEventListener('mousedown', onPointerDown)
        domElement.removeEventListener('touchstart', onPointerDown)
        domElement.removeEventListener('mousemove', onPointerHover)
        domElement.removeEventListener('touchmove', onPointerHover)
        domElement.removeEventListener('touchmove', onPointerMove)
        document.removeEventListener('mouseup', onPointerUp)
        domElement.removeEventListener('touchend', onPointerUp)
        domElement.removeEventListener('touchcancel', onPointerUp)
        domElement.removeEventListener('touchleave', onPointerUp)
      }

      // Set current object
      this.attach = function(object) {
        this.object = object
        this.visible = true
      }

      // Detatch from object
      this.detach = function() {
        this.object = undefined
        this.visible = false
        this.axis = null
      }

      // Defined getter, setter and store for a property
      function defineProperty(propName, defaultValue) {
        var propValue = defaultValue

        Object.defineProperty(scope, propName, {
          get: function() {
            return propValue !== undefined ? propValue : defaultValue
          },

          set: function(value) {
            if (propValue !== value) {
              propValue = value
              _plane[propName] = value
              _gizmo[propName] = value

              scope.dispatchEvent({
                type: propName + '-changed',
                value: value
              })
              scope.dispatchEvent(changeEvent)
            }
          }
        })

        scope[propName] = defaultValue
        _plane[propName] = defaultValue
        _gizmo[propName] = defaultValue
      }

      // updateMatrixWorld  updates key transformation variables
      this.updateMatrixWorld = function() {
        if (this.object !== undefined) {
          this.object.updateMatrixWorld()
          this.object.parent.matrixWorld.decompose(
            parentPosition,
            parentQuaternion,
            parentScale
          )
          this.object.matrixWorld.decompose(
            worldPosition,
            worldQuaternion,
            worldScale
          )

          parentQuaternionInv.copy(parentQuaternion).inverse()
          worldQuaternionInv.copy(worldQuaternion).inverse()
        }

        this.camera.updateMatrixWorld()
        this.camera.matrixWorld.decompose(
          cameraPosition,
          cameraQuaternion,
          cameraScale
        )

        if (this.camera instanceof THREE.PerspectiveCamera) {
          eye
            .copy(cameraPosition)
            .sub(worldPosition)
            .normalize()
        } else if (this.camera instanceof THREE.OrthographicCamera) {
          eye.copy(cameraPosition).normalize()
        }

        THREE.Object3D.prototype.updateMatrixWorld.call(this)
      }

      this.pointerHover = function(pointer) {
        if (
          this.object === undefined ||
          this.dragging === true ||
          (pointer.button !== undefined && pointer.button !== 0)
        )
          return

        ray.setFromCamera(pointer, this.camera)

        var intersect =
          ray.intersectObjects(_gizmo.picker[this.mode].children, true)[0] ||
          false

        if (intersect) {
          this.axis = intersect.object.name
        } else {
          this.axis = null
        }
      }

      this.pointerDown = function(pointer) {
        if (
          this.object === undefined ||
          this.dragging === true ||
          (pointer.button !== undefined && pointer.button !== 0)
        )
          return

        if (
          (pointer.button === 0 || pointer.button === undefined) &&
          this.axis !== null
        ) {
          ray.setFromCamera(pointer, this.camera)

          var planeIntersect = ray.intersectObjects([_plane], true)[0] || false

          if (planeIntersect) {
            var space = this.space

            if (this.mode === 'scale') {
              space = 'local'
            } else if (
              this.axis === 'E' ||
              this.axis === 'XYZE' ||
              this.axis === 'XYZ'
            ) {
              space = 'world'
            }

            if (space === 'local' && this.mode === 'rotate') {
              var snap = this.rotationSnap

              if (this.axis === 'X' && snap)
                this.object.rotation.x =
                  Math.round(this.object.rotation.x / snap) * snap
              if (this.axis === 'Y' && snap)
                this.object.rotation.y =
                  Math.round(this.object.rotation.y / snap) * snap
              if (this.axis === 'Z' && snap)
                this.object.rotation.z =
                  Math.round(this.object.rotation.z / snap) * snap
            }

            this.object.updateMatrixWorld()
            this.object.parent.updateMatrixWorld()

            positionStart.copy(this.object.position)
            quaternionStart.copy(this.object.quaternion)
            scaleStart.copy(this.object.scale)

            this.object.matrixWorld.decompose(
              worldPositionStart,
              worldQuaternionStart,
              worldScaleStart
            )

            pointStart.copy(planeIntersect.point).sub(worldPositionStart)
          }

          this.dragging = true
          mouseDownEvent.mode = this.mode
          this.dispatchEvent(mouseDownEvent)
        }
      }

      this.pointerMove = function(pointer) {
        var axis = this.axis
        var mode = this.mode
        var object = this.object
        var space = this.space

        if (mode === 'scale') {
          space = 'local'
        } else if (axis === 'E' || axis === 'XYZE' || axis === 'XYZ') {
          space = 'world'
        }

        if (
          object === undefined ||
          axis === null ||
          this.dragging === false ||
          (pointer.button !== undefined && pointer.button !== 0)
        )
          return

        ray.setFromCamera(pointer, this.camera)

        var planeIntersect = ray.intersectObjects([_plane], true)[0] || false

        if (planeIntersect === false) return

        pointEnd.copy(planeIntersect.point).sub(worldPositionStart)

        if (mode === 'translate') {
          // Apply translate

          offset.copy(pointEnd).sub(pointStart)

          if (space === 'local' && axis !== 'XYZ') {
            offset.applyQuaternion(worldQuaternionInv)
          }

          if (axis.indexOf('X') === -1) offset.x = 0
          if (axis.indexOf('Y') === -1) offset.y = 0
          if (axis.indexOf('Z') === -1) offset.z = 0

          if (space === 'local' && axis !== 'XYZ') {
            offset.applyQuaternion(quaternionStart).divide(parentScale)
          } else {
            offset.applyQuaternion(parentQuaternionInv).divide(parentScale)
          }

          object.position.copy(offset).add(positionStart)

          // Apply translation snap

          if (this.translationSnap) {
            if (space === 'local') {
              object.position.applyQuaternion(
                _tempQuaternion.copy(quaternionStart).inverse()
              )

              if (axis.search('X') !== -1) {
                object.position.x =
                  Math.round(object.position.x / this.translationSnap) *
                  this.translationSnap
              }

              if (axis.search('Y') !== -1) {
                object.position.y =
                  Math.round(object.position.y / this.translationSnap) *
                  this.translationSnap
              }

              if (axis.search('Z') !== -1) {
                object.position.z =
                  Math.round(object.position.z / this.translationSnap) *
                  this.translationSnap
              }

              object.position.applyQuaternion(quaternionStart)
            }

            if (space === 'world') {
              if (object.parent) {
                object.position.add(
                  _tempVector.setFromMatrixPosition(object.parent.matrixWorld)
                )
              }

              if (axis.search('X') !== -1) {
                object.position.x =
                  Math.round(object.position.x / this.translationSnap) *
                  this.translationSnap
              }

              if (axis.search('Y') !== -1) {
                object.position.y =
                  Math.round(object.position.y / this.translationSnap) *
                  this.translationSnap
              }

              if (axis.search('Z') !== -1) {
                object.position.z =
                  Math.round(object.position.z / this.translationSnap) *
                  this.translationSnap
              }

              if (object.parent) {
                object.position.sub(
                  _tempVector.setFromMatrixPosition(object.parent.matrixWorld)
                )
              }
            }
          }
        } else if (mode === 'scale') {
          if (axis.search('XYZ') !== -1) {
            var d = pointEnd.length() / pointStart.length()

            if (pointEnd.dot(pointStart) < 0) d *= -1

            _tempVector2.set(d, d, d)
          } else {
            _tempVector.copy(pointStart)
            _tempVector2.copy(pointEnd)

            _tempVector.applyQuaternion(worldQuaternionInv)
            _tempVector2.applyQuaternion(worldQuaternionInv)

            _tempVector2.divide(_tempVector)

            if (axis.search('X') === -1) {
              _tempVector2.x = 1
            }
            if (axis.search('Y') === -1) {
              _tempVector2.y = 1
            }
            if (axis.search('Z') === -1) {
              _tempVector2.z = 1
            }
          }

          // Apply scale

          object.scale.copy(scaleStart).multiply(_tempVector2)
        } else if (mode === 'rotate') {
          offset.copy(pointEnd).sub(pointStart)

          var ROTATION_SPEED =
            20 /
            worldPosition.distanceTo(
              _tempVector.setFromMatrixPosition(this.camera.matrixWorld)
            )

          if (axis === 'E') {
            rotationAxis.copy(eye)
            rotationAngle = pointEnd.angleTo(pointStart)

            startNorm.copy(pointStart).normalize()
            endNorm.copy(pointEnd).normalize()

            rotationAngle *= endNorm.cross(startNorm).dot(eye) < 0 ? 1 : -1
          } else if (axis === 'XYZE') {
            rotationAxis
              .copy(offset)
              .cross(eye)
              .normalize()
            rotationAngle =
              offset.dot(_tempVector.copy(rotationAxis).cross(this.eye)) *
              ROTATION_SPEED
          } else if (axis === 'X' || axis === 'Y' || axis === 'Z') {
            rotationAxis.copy(_unit[axis])

            _tempVector.copy(_unit[axis])

            if (space === 'local') {
              _tempVector.applyQuaternion(worldQuaternion)
            }

            rotationAngle =
              offset.dot(_tempVector.cross(eye).normalize()) * ROTATION_SPEED
          }

          // Apply rotation snap

          if (this.rotationSnap)
            rotationAngle =
              Math.round(rotationAngle / this.rotationSnap) * this.rotationSnap

          this.rotationAngle = rotationAngle

          // Apply rotate
          if (space === 'local' && axis !== 'E' && axis !== 'XYZE') {
            object.quaternion.copy(quaternionStart)
            object.quaternion
              .multiply(
                _tempQuaternion.setFromAxisAngle(rotationAxis, rotationAngle)
              )
              .normalize()
          } else {
            rotationAxis.applyQuaternion(parentQuaternionInv)
            object.quaternion.copy(
              _tempQuaternion.setFromAxisAngle(rotationAxis, rotationAngle)
            )
            object.quaternion.multiply(quaternionStart).normalize()
          }
        }

        this.dispatchEvent(changeEvent)
        this.dispatchEvent(objectChangeEvent)
      }

      this.pointerUp = function(pointer) {
        if (pointer.button !== undefined && pointer.button !== 0) return

        if (this.dragging && this.axis !== null) {
          mouseUpEvent.mode = this.mode
          this.dispatchEvent(mouseUpEvent)
        }

        this.dragging = false

        if (pointer.button === undefined) this.axis = null
      }

      // normalize mouse / touch pointer and remap {x,y} to view space.

      function getPointer(event) {
        var pointer = event.changedTouches ? event.changedTouches[0] : event

        var rect = domElement.getBoundingClientRect()

        return {
          x: ((pointer.clientX - rect.left) / rect.width) * 2 - 1,
          y: (-(pointer.clientY - rect.top) / rect.height) * 2 + 1,
          button: event.button
        }
      }

      // mouse / touch event handlers

      function onPointerHover(event) {
        if (!scope.enabled) return

        scope.pointerHover(getPointer(event))
      }

      function onPointerDown(event) {
        if (!scope.enabled) return

        document.addEventListener('mousemove', onPointerMove, false)

        scope.pointerHover(getPointer(event))
        scope.pointerDown(getPointer(event))
      }

      function onPointerMove(event) {
        if (!scope.enabled) return

        scope.pointerMove(getPointer(event))
      }

      function onPointerUp(event) {
        if (!scope.enabled) return

        document.removeEventListener('mousemove', onPointerMove, false)

        scope.pointerUp(getPointer(event))
      }

      // TODO: depricate

      this.getMode = function() {
        return scope.mode
      }

      this.setMode = function(mode) {
        scope.mode = mode
      }

      this.setTranslationSnap = function(translationSnap) {
        scope.translationSnap = translationSnap
      }

      this.setRotationSnap = function(rotationSnap) {
        scope.rotationSnap = rotationSnap
      }

      this.setSize = function(size) {
        scope.size = size
      }

      this.setSpace = function(space) {
        scope.space = space
      }

      this.update = function() {
        console.warn(
          'THREE.TransformControls: update function has been depricated.'
        )
      }
    }

    THREE.TransformControls.prototype = Object.assign(
      Object.create(THREE.Object3D.prototype),
      {
        constructor: THREE.TransformControls,

        isTransformControls: true
      }
    )

    THREE.TransformControlsGizmo = function() {
      'use strict'

      THREE.Object3D.call(this)

      this.type = 'TransformControlsGizmo'

      // shared materials

      var gizmoMaterial = new THREE.MeshBasicMaterial({
        depthTest: false,
        depthWrite: false,
        transparent: true,
        side: THREE.DoubleSide,
        fog: false
      })

      var gizmoLineMaterial = new THREE.LineBasicMaterial({
        depthTest: false,
        depthWrite: false,
        transparent: true,
        linewidth: 1,
        fog: false
      })

      // Make unique material for each axis/color

      var matInvisible = gizmoMaterial.clone()
      matInvisible.opacity = 0.15

      var matHelper = gizmoMaterial.clone()
      matHelper.opacity = 0.33

      var matRed = gizmoMaterial.clone()
      matRed.color.set(0xff0000)

      var matGreen = gizmoMaterial.clone()
      matGreen.color.set(0x00ff00)

      var matBlue = gizmoMaterial.clone()
      matBlue.color.set(0x0000ff)

      var matWhiteTransperent = gizmoMaterial.clone()
      matWhiteTransperent.opacity = 0.25

      var matYellowTransparent = matWhiteTransperent.clone()
      matYellowTransparent.color.set(0xffff00)

      var matCyanTransparent = matWhiteTransperent.clone()
      matCyanTransparent.color.set(0x00ffff)

      var matMagentaTransparent = matWhiteTransperent.clone()
      matMagentaTransparent.color.set(0xff00ff)

      var matYellow = gizmoMaterial.clone()
      matYellow.color.set(0xffff00)

      var matLineRed = gizmoLineMaterial.clone()
      matLineRed.color.set(0xff0000)

      var matLineGreen = gizmoLineMaterial.clone()
      matLineGreen.color.set(0x00ff00)

      var matLineBlue = gizmoLineMaterial.clone()
      matLineBlue.color.set(0x0000ff)

      var matLineCyan = gizmoLineMaterial.clone()
      matLineCyan.color.set(0x00ffff)

      var matLineMagenta = gizmoLineMaterial.clone()
      matLineMagenta.color.set(0xff00ff)

      var matLineYellow = gizmoLineMaterial.clone()
      matLineYellow.color.set(0xffff00)

      var matLineGray = gizmoLineMaterial.clone()
      matLineGray.color.set(0x787878)

      var matLineYellowTransparent = matLineYellow.clone()
      matLineYellowTransparent.opacity = 0.25

      // reusable geometry

      var arrowGeometry = new THREE.CylinderBufferGeometry(
        0,
        0.05,
        0.2,
        12,
        1,
        false
      )

      var scaleHandleGeometry = new THREE.BoxBufferGeometry(0.125, 0.125, 0.125)

      var lineGeometry = new THREE.BufferGeometry()
      lineGeometry.addAttribute(
        'position',
        new THREE.Float32BufferAttribute([0, 0, 0, 1, 0, 0], 3)
      )

      var CircleGeometry = function(radius, arc) {
        var geometry = new THREE.BufferGeometry()
        var vertices = []

        for (var i = 0; i <= 64 * arc; ++i) {
          vertices.push(
            0,
            Math.cos((i / 32) * Math.PI) * radius,
            Math.sin((i / 32) * Math.PI) * radius
          )
        }

        geometry.addAttribute(
          'position',
          new THREE.Float32BufferAttribute(vertices, 3)
        )

        return geometry
      }

      // Special geometry for transform helper. If scaled with position vector it spans from [0,0,0] to position

      var TranslateHelperGeometry = function(radius, arc) {
        var geometry = new THREE.BufferGeometry()

        geometry.addAttribute(
          'position',
          new THREE.Float32BufferAttribute([0, 0, 0, 1, 1, 1], 3)
        )

        return geometry
      }

      // Gizmo definitions - custom hierarchy definitions for setupGizmo() function

      var gizmoTranslate = {
        X: [
          [
            new THREE.Mesh(arrowGeometry, matRed),
            [1, 0, 0],
            [0, 0, -Math.PI / 2],
            null,
            'fwd'
          ],
          [
            new THREE.Mesh(arrowGeometry, matRed),
            [1, 0, 0],
            [0, 0, Math.PI / 2],
            null,
            'bwd'
          ],
          [new THREE.Line(lineGeometry, matLineRed)]
        ],
        Y: [
          [
            new THREE.Mesh(arrowGeometry, matGreen),
            [0, 1, 0],
            null,
            null,
            'fwd'
          ],
          [
            new THREE.Mesh(arrowGeometry, matGreen),
            [0, 1, 0],
            [Math.PI, 0, 0],
            null,
            'bwd'
          ],
          [
            new THREE.Line(lineGeometry, matLineGreen),
            null,
            [0, 0, Math.PI / 2]
          ]
        ],
        Z: [
          [
            new THREE.Mesh(arrowGeometry, matBlue),
            [0, 0, 1],
            [Math.PI / 2, 0, 0],
            null,
            'fwd'
          ],
          [
            new THREE.Mesh(arrowGeometry, matBlue),
            [0, 0, 1],
            [-Math.PI / 2, 0, 0],
            null,
            'bwd'
          ],
          [
            new THREE.Line(lineGeometry, matLineBlue),
            null,
            [0, -Math.PI / 2, 0]
          ]
        ],
        XYZ: [
          [
            new THREE.Mesh(
              new THREE.OctahedronBufferGeometry(0.1, 0),
              matWhiteTransperent
            ),
            [0, 0, 0],
            [0, 0, 0]
          ]
        ],
        XY: [
          [
            new THREE.Mesh(
              new THREE.PlaneBufferGeometry(0.295, 0.295),
              matYellowTransparent
            ),
            [0.15, 0.15, 0]
          ],
          [
            new THREE.Line(lineGeometry, matLineYellow),
            [0.18, 0.3, 0],
            null,
            [0.125, 1, 1]
          ],
          [
            new THREE.Line(lineGeometry, matLineYellow),
            [0.3, 0.18, 0],
            [0, 0, Math.PI / 2],
            [0.125, 1, 1]
          ]
        ],
        YZ: [
          [
            new THREE.Mesh(
              new THREE.PlaneBufferGeometry(0.295, 0.295),
              matCyanTransparent
            ),
            [0, 0.15, 0.15],
            [0, Math.PI / 2, 0]
          ],
          [
            new THREE.Line(lineGeometry, matLineCyan),
            [0, 0.18, 0.3],
            [0, 0, Math.PI / 2],
            [0.125, 1, 1]
          ],
          [
            new THREE.Line(lineGeometry, matLineCyan),
            [0, 0.3, 0.18],
            [0, -Math.PI / 2, 0],
            [0.125, 1, 1]
          ]
        ],
        XZ: [
          [
            new THREE.Mesh(
              new THREE.PlaneBufferGeometry(0.295, 0.295),
              matMagentaTransparent
            ),
            [0.15, 0, 0.15],
            [-Math.PI / 2, 0, 0]
          ],
          [
            new THREE.Line(lineGeometry, matLineMagenta),
            [0.18, 0, 0.3],
            null,
            [0.125, 1, 1]
          ],
          [
            new THREE.Line(lineGeometry, matLineMagenta),
            [0.3, 0, 0.18],
            [0, -Math.PI / 2, 0],
            [0.125, 1, 1]
          ]
        ]
      }

      var pickerTranslate = {
        X: [
          [
            new THREE.Mesh(
              new THREE.CylinderBufferGeometry(0.2, 0, 1, 4, 1, false),
              matInvisible
            ),
            [0.6, 0, 0],
            [0, 0, -Math.PI / 2]
          ]
        ],
        Y: [
          [
            new THREE.Mesh(
              new THREE.CylinderBufferGeometry(0.2, 0, 1, 4, 1, false),
              matInvisible
            ),
            [0, 0.6, 0]
          ]
        ],
        Z: [
          [
            new THREE.Mesh(
              new THREE.CylinderBufferGeometry(0.2, 0, 1, 4, 1, false),
              matInvisible
            ),
            [0, 0, 0.6],
            [Math.PI / 2, 0, 0]
          ]
        ],
        XYZ: [
          [
            new THREE.Mesh(
              new THREE.OctahedronBufferGeometry(0.2, 0),
              matInvisible
            )
          ]
        ],
        XY: [
          [
            new THREE.Mesh(
              new THREE.PlaneBufferGeometry(0.4, 0.4),
              matInvisible
            ),
            [0.2, 0.2, 0]
          ]
        ],
        YZ: [
          [
            new THREE.Mesh(
              new THREE.PlaneBufferGeometry(0.4, 0.4),
              matInvisible
            ),
            [0, 0.2, 0.2],
            [0, Math.PI / 2, 0]
          ]
        ],
        XZ: [
          [
            new THREE.Mesh(
              new THREE.PlaneBufferGeometry(0.4, 0.4),
              matInvisible
            ),
            [0.2, 0, 0.2],
            [-Math.PI / 2, 0, 0]
          ]
        ]
      }

      var helperTranslate = {
        START: [
          [
            new THREE.Mesh(
              new THREE.OctahedronBufferGeometry(0.01, 2),
              matHelper
            ),
            null,
            null,
            null,
            'helper'
          ]
        ],
        END: [
          [
            new THREE.Mesh(
              new THREE.OctahedronBufferGeometry(0.01, 2),
              matHelper
            ),
            null,
            null,
            null,
            'helper'
          ]
        ],
        DELTA: [
          [
            new THREE.Line(TranslateHelperGeometry(), matHelper),
            null,
            null,
            null,
            'helper'
          ]
        ],
        X: [
          [
            new THREE.Line(lineGeometry, matHelper.clone()),
            [-1e3, 0, 0],
            null,
            [1e6, 1, 1],
            'helper'
          ]
        ],
        Y: [
          [
            new THREE.Line(lineGeometry, matHelper.clone()),
            [0, -1e3, 0],
            [0, 0, Math.PI / 2],
            [1e6, 1, 1],
            'helper'
          ]
        ],
        Z: [
          [
            new THREE.Line(lineGeometry, matHelper.clone()),
            [0, 0, -1e3],
            [0, -Math.PI / 2, 0],
            [1e6, 1, 1],
            'helper'
          ]
        ]
      }

      var gizmoRotate = {
        X: [
          [new THREE.Line(CircleGeometry(1, 0.5), matLineRed)],
          [
            new THREE.Mesh(new THREE.OctahedronBufferGeometry(0.04, 0), matRed),
            [0, 0, 0.99],
            null,
            [1, 3, 1]
          ]
        ],
        Y: [
          [
            new THREE.Line(CircleGeometry(1, 0.5), matLineGreen),
            null,
            [0, 0, -Math.PI / 2]
          ],
          [
            new THREE.Mesh(
              new THREE.OctahedronBufferGeometry(0.04, 0),
              matGreen
            ),
            [0, 0, 0.99],
            null,
            [3, 1, 1]
          ]
        ],
        Z: [
          [
            new THREE.Line(CircleGeometry(1, 0.5), matLineBlue),
            null,
            [0, Math.PI / 2, 0]
          ],
          [
            new THREE.Mesh(
              new THREE.OctahedronBufferGeometry(0.04, 0),
              matBlue
            ),
            [0.99, 0, 0],
            null,
            [1, 3, 1]
          ]
        ],
        E: [
          [
            new THREE.Line(CircleGeometry(1.25, 1), matLineYellowTransparent),
            null,
            [0, Math.PI / 2, 0]
          ],
          [
            new THREE.Mesh(
              new THREE.CylinderBufferGeometry(0.03, 0, 0.15, 4, 1, false),
              matLineYellowTransparent
            ),
            [1.17, 0, 0],
            [0, 0, -Math.PI / 2],
            [1, 1, 0.001]
          ],
          [
            new THREE.Mesh(
              new THREE.CylinderBufferGeometry(0.03, 0, 0.15, 4, 1, false),
              matLineYellowTransparent
            ),
            [-1.17, 0, 0],
            [0, 0, Math.PI / 2],
            [1, 1, 0.001]
          ],
          [
            new THREE.Mesh(
              new THREE.CylinderBufferGeometry(0.03, 0, 0.15, 4, 1, false),
              matLineYellowTransparent
            ),
            [0, -1.17, 0],
            [Math.PI, 0, 0],
            [1, 1, 0.001]
          ],
          [
            new THREE.Mesh(
              new THREE.CylinderBufferGeometry(0.03, 0, 0.15, 4, 1, false),
              matLineYellowTransparent
            ),
            [0, 1.17, 0],
            [0, 0, 0],
            [1, 1, 0.001]
          ]
        ],
        XYZE: [
          [
            new THREE.Line(CircleGeometry(1, 1), matLineGray),
            null,
            [0, Math.PI / 2, 0]
          ]
        ]
      }

      var helperRotate = {
        AXIS: [
          [
            new THREE.Line(lineGeometry, matHelper.clone()),
            [-1e3, 0, 0],
            null,
            [1e6, 1, 1],
            'helper'
          ]
        ]
      }

      var pickerRotate = {
        X: [
          [
            new THREE.Mesh(
              new THREE.TorusBufferGeometry(1, 0.1, 4, 24),
              matInvisible
            ),
            [0, 0, 0],
            [0, -Math.PI / 2, -Math.PI / 2]
          ]
        ],
        Y: [
          [
            new THREE.Mesh(
              new THREE.TorusBufferGeometry(1, 0.1, 4, 24),
              matInvisible
            ),
            [0, 0, 0],
            [Math.PI / 2, 0, 0]
          ]
        ],
        Z: [
          [
            new THREE.Mesh(
              new THREE.TorusBufferGeometry(1, 0.1, 4, 24),
              matInvisible
            ),
            [0, 0, 0],
            [0, 0, -Math.PI / 2]
          ]
        ],
        E: [
          [
            new THREE.Mesh(
              new THREE.TorusBufferGeometry(1.25, 0.1, 2, 24),
              matInvisible
            )
          ]
        ],
        XYZE: [
          [
            new THREE.Mesh(
              new THREE.SphereBufferGeometry(0.7, 10, 8),
              matInvisible
            )
          ]
        ]
      }

      var gizmoScale = {
        X: [
          [
            new THREE.Mesh(scaleHandleGeometry, matRed),
            [0.8, 0, 0],
            [0, 0, -Math.PI / 2]
          ],
          [new THREE.Line(lineGeometry, matLineRed), null, null, [0.8, 1, 1]]
        ],
        Y: [
          [new THREE.Mesh(scaleHandleGeometry, matGreen), [0, 0.8, 0]],
          [
            new THREE.Line(lineGeometry, matLineGreen),
            null,
            [0, 0, Math.PI / 2],
            [0.8, 1, 1]
          ]
        ],
        Z: [
          [
            new THREE.Mesh(scaleHandleGeometry, matBlue),
            [0, 0, 0.8],
            [Math.PI / 2, 0, 0]
          ],
          [
            new THREE.Line(lineGeometry, matLineBlue),
            null,
            [0, -Math.PI / 2, 0],
            [0.8, 1, 1]
          ]
        ],
        XY: [
          [
            new THREE.Mesh(scaleHandleGeometry, matYellowTransparent),
            [0.85, 0.85, 0],
            null,
            [2, 2, 0.2]
          ],
          [
            new THREE.Line(lineGeometry, matLineYellow),
            [0.855, 0.98, 0],
            null,
            [0.125, 1, 1]
          ],
          [
            new THREE.Line(lineGeometry, matLineYellow),
            [0.98, 0.855, 0],
            [0, 0, Math.PI / 2],
            [0.125, 1, 1]
          ]
        ],
        YZ: [
          [
            new THREE.Mesh(scaleHandleGeometry, matCyanTransparent),
            [0, 0.85, 0.85],
            null,
            [0.2, 2, 2]
          ],
          [
            new THREE.Line(lineGeometry, matLineCyan),
            [0, 0.855, 0.98],
            [0, 0, Math.PI / 2],
            [0.125, 1, 1]
          ],
          [
            new THREE.Line(lineGeometry, matLineCyan),
            [0, 0.98, 0.855],
            [0, -Math.PI / 2, 0],
            [0.125, 1, 1]
          ]
        ],
        XZ: [
          [
            new THREE.Mesh(scaleHandleGeometry, matMagentaTransparent),
            [0.85, 0, 0.85],
            null,
            [2, 0.2, 2]
          ],
          [
            new THREE.Line(lineGeometry, matLineMagenta),
            [0.855, 0, 0.98],
            null,
            [0.125, 1, 1]
          ],
          [
            new THREE.Line(lineGeometry, matLineMagenta),
            [0.98, 0, 0.855],
            [0, -Math.PI / 2, 0],
            [0.125, 1, 1]
          ]
        ],
        XYZX: [
          [
            new THREE.Mesh(
              new THREE.BoxBufferGeometry(0.125, 0.125, 0.125),
              matWhiteTransperent
            ),
            [1.1, 0, 0]
          ]
        ],
        XYZY: [
          [
            new THREE.Mesh(
              new THREE.BoxBufferGeometry(0.125, 0.125, 0.125),
              matWhiteTransperent
            ),
            [0, 1.1, 0]
          ]
        ],
        XYZZ: [
          [
            new THREE.Mesh(
              new THREE.BoxBufferGeometry(0.125, 0.125, 0.125),
              matWhiteTransperent
            ),
            [0, 0, 1.1]
          ]
        ]
      }

      var pickerScale = {
        X: [
          [
            new THREE.Mesh(
              new THREE.CylinderBufferGeometry(0.2, 0, 0.8, 4, 1, false),
              matInvisible
            ),
            [0.5, 0, 0],
            [0, 0, -Math.PI / 2]
          ]
        ],
        Y: [
          [
            new THREE.Mesh(
              new THREE.CylinderBufferGeometry(0.2, 0, 0.8, 4, 1, false),
              matInvisible
            ),
            [0, 0.5, 0]
          ]
        ],
        Z: [
          [
            new THREE.Mesh(
              new THREE.CylinderBufferGeometry(0.2, 0, 0.8, 4, 1, false),
              matInvisible
            ),
            [0, 0, 0.5],
            [Math.PI / 2, 0, 0]
          ]
        ],
        XY: [
          [
            new THREE.Mesh(scaleHandleGeometry, matInvisible),
            [0.85, 0.85, 0],
            null,
            [3, 3, 0.2]
          ]
        ],
        YZ: [
          [
            new THREE.Mesh(scaleHandleGeometry, matInvisible),
            [0, 0.85, 0.85],
            null,
            [0.2, 3, 3]
          ]
        ],
        XZ: [
          [
            new THREE.Mesh(scaleHandleGeometry, matInvisible),
            [0.85, 0, 0.85],
            null,
            [3, 0.2, 3]
          ]
        ],
        XYZX: [
          [
            new THREE.Mesh(
              new THREE.BoxBufferGeometry(0.2, 0.2, 0.2),
              matInvisible
            ),
            [1.1, 0, 0]
          ]
        ],
        XYZY: [
          [
            new THREE.Mesh(
              new THREE.BoxBufferGeometry(0.2, 0.2, 0.2),
              matInvisible
            ),
            [0, 1.1, 0]
          ]
        ],
        XYZZ: [
          [
            new THREE.Mesh(
              new THREE.BoxBufferGeometry(0.2, 0.2, 0.2),
              matInvisible
            ),
            [0, 0, 1.1]
          ]
        ]
      }

      var helperScale = {
        X: [
          [
            new THREE.Line(lineGeometry, matHelper.clone()),
            [-1e3, 0, 0],
            null,
            [1e6, 1, 1],
            'helper'
          ]
        ],
        Y: [
          [
            new THREE.Line(lineGeometry, matHelper.clone()),
            [0, -1e3, 0],
            [0, 0, Math.PI / 2],
            [1e6, 1, 1],
            'helper'
          ]
        ],
        Z: [
          [
            new THREE.Line(lineGeometry, matHelper.clone()),
            [0, 0, -1e3],
            [0, -Math.PI / 2, 0],
            [1e6, 1, 1],
            'helper'
          ]
        ]
      }

      // Creates an Object3D with gizmos described in custom hierarchy definition.

      var setupGizmo = function(gizmoMap) {
        var gizmo = new THREE.Object3D()

        for (var name in gizmoMap) {
          for (var i = gizmoMap[name].length; i--; ) {
            var object = gizmoMap[name][i][0].clone()
            var position = gizmoMap[name][i][1]
            var rotation = gizmoMap[name][i][2]
            var scale = gizmoMap[name][i][3]
            var tag = gizmoMap[name][i][4]

            // name and tag properties are essential for picking and updating logic.
            object.name = name
            object.tag = tag

            if (position) {
              object.position.set(position[0], position[1], position[2])
            }
            if (rotation) {
              object.rotation.set(rotation[0], rotation[1], rotation[2])
            }
            if (scale) {
              object.scale.set(scale[0], scale[1], scale[2])
            }

            object.updateMatrix()

            var tempGeometry = object.geometry.clone()
            tempGeometry.applyMatrix(object.matrix)
            object.geometry = tempGeometry

            object.position.set(0, 0, 0)
            object.rotation.set(0, 0, 0)
            object.scale.set(1, 1, 1)

            gizmo.add(object)
          }
        }

        return gizmo
      }

      // Reusable utility variables

      var tempVector = new THREE.Vector3(0, 0, 0)
      var tempEuler = new THREE.Euler()
      var alignVector = new THREE.Vector3(0, 1, 0)
      var zeroVector = new THREE.Vector3(0, 0, 0)
      var lookAtMatrix = new THREE.Matrix4()
      var tempQuaternion = new THREE.Quaternion()
      var tempQuaternion2 = new THREE.Quaternion()
      var identityQuaternion = new THREE.Quaternion()

      var unitX = new THREE.Vector3(1, 0, 0)
      var unitY = new THREE.Vector3(0, 1, 0)
      var unitZ = new THREE.Vector3(0, 0, 1)

      // Gizmo creation

      this.gizmo = {}
      this.picker = {}
      this.helper = {}

      this.add((this.gizmo['translate'] = setupGizmo(gizmoTranslate)))
      this.add((this.gizmo['rotate'] = setupGizmo(gizmoRotate)))
      this.add((this.gizmo['scale'] = setupGizmo(gizmoScale)))
      this.add((this.picker['translate'] = setupGizmo(pickerTranslate)))
      this.add((this.picker['rotate'] = setupGizmo(pickerRotate)))
      this.add((this.picker['scale'] = setupGizmo(pickerScale)))
      this.add((this.helper['translate'] = setupGizmo(helperTranslate)))
      this.add((this.helper['rotate'] = setupGizmo(helperRotate)))
      this.add((this.helper['scale'] = setupGizmo(helperScale)))

      // Pickers should be hidden always

      this.picker['translate'].visible = false
      this.picker['rotate'].visible = false
      this.picker['scale'].visible = false

      // updateMatrixWorld will update transformations and appearance of individual handles

      this.updateMatrixWorld = function() {
        var space = this.space

        if (this.mode === 'scale') space = 'local' // scale always oriented to local rotation

        var quaternion =
          space === 'local' ? this.worldQuaternion : identityQuaternion

        // Show only gizmos for current transform mode

        this.gizmo['translate'].visible = this.mode === 'translate'
        this.gizmo['rotate'].visible = this.mode === 'rotate'
        this.gizmo['scale'].visible = this.mode === 'scale'

        this.helper['translate'].visible = this.mode === 'translate'
        this.helper['rotate'].visible = this.mode === 'rotate'
        this.helper['scale'].visible = this.mode === 'scale'

        var handles = []
        handles = handles.concat(this.picker[this.mode].children)
        handles = handles.concat(this.gizmo[this.mode].children)
        handles = handles.concat(this.helper[this.mode].children)

        for (var i = 0; i < handles.length; i++) {
          var handle = handles[i]

          // hide aligned to camera

          handle.visible = true
          handle.rotation.set(0, 0, 0)
          handle.position.copy(this.worldPosition)

          var eyeDistance = this.worldPosition.distanceTo(this.cameraPosition)
          handle.scale
            .set(1, 1, 1)
            .multiplyScalar((eyeDistance * this.size) / 7)

          // TODO: simplify helpers and consider decoupling from gizmo

          if (handle.tag === 'helper') {
            handle.visible = false

            if (handle.name === 'AXIS') {
              handle.position.copy(this.worldPositionStart)
              handle.visible = !!this.axis

              if (this.axis === 'X') {
                tempQuaternion.setFromEuler(tempEuler.set(0, 0, 0))
                handle.quaternion.copy(quaternion).multiply(tempQuaternion)

                if (
                  Math.abs(
                    alignVector
                      .copy(unitX)
                      .applyQuaternion(quaternion)
                      .dot(this.eye)
                  ) > 0.9
                ) {
                  handle.visible = false
                }
              }

              if (this.axis === 'Y') {
                tempQuaternion.setFromEuler(tempEuler.set(0, 0, Math.PI / 2))
                handle.quaternion.copy(quaternion).multiply(tempQuaternion)

                if (
                  Math.abs(
                    alignVector
                      .copy(unitY)
                      .applyQuaternion(quaternion)
                      .dot(this.eye)
                  ) > 0.9
                ) {
                  handle.visible = false
                }
              }

              if (this.axis === 'Z') {
                tempQuaternion.setFromEuler(tempEuler.set(0, Math.PI / 2, 0))
                handle.quaternion.copy(quaternion).multiply(tempQuaternion)

                if (
                  Math.abs(
                    alignVector
                      .copy(unitZ)
                      .applyQuaternion(quaternion)
                      .dot(this.eye)
                  ) > 0.9
                ) {
                  handle.visible = false
                }
              }

              if (this.axis === 'XYZE') {
                tempQuaternion.setFromEuler(tempEuler.set(0, Math.PI / 2, 0))
                alignVector.copy(this.rotationAxis)
                handle.quaternion.setFromRotationMatrix(
                  lookAtMatrix.lookAt(zeroVector, alignVector, unitY)
                )
                handle.quaternion.multiply(tempQuaternion)
                handle.visible = this.dragging
              }

              if (this.axis === 'E') {
                handle.visible = false
              }
            } else if (handle.name === 'START') {
              handle.position.copy(this.worldPositionStart)
              handle.visible = this.dragging
            } else if (handle.name === 'END') {
              handle.position.copy(this.worldPosition)
              handle.visible = this.dragging
            } else if (handle.name === 'DELTA') {
              handle.position.copy(this.worldPositionStart)
              handle.quaternion.copy(this.worldQuaternionStart)
              tempVector
                .set(1e-10, 1e-10, 1e-10)
                .add(this.worldPositionStart)
                .sub(this.worldPosition)
                .multiplyScalar(-1)
              tempVector.applyQuaternion(
                this.worldQuaternionStart.clone().inverse()
              )
              handle.scale.copy(tempVector)
              handle.visible = this.dragging
            } else {
              handle.quaternion.copy(quaternion)

              if (this.dragging) {
                handle.position.copy(this.worldPositionStart)
              } else {
                handle.position.copy(this.worldPosition)
              }

              if (this.axis) {
                handle.visible = this.axis.search(handle.name) !== -1
              }
            }

            // If updating helper, skip rest of the loop
            continue
          }

          // Align handles to current local or world rotation

          handle.quaternion.copy(quaternion)

          if (this.mode === 'translate' || this.mode === 'scale') {
            // Hide translate and scale axis facing the camera

            var AXIS_HIDE_TRESHOLD = 0.99
            var PLANE_HIDE_TRESHOLD = 0.2
            var AXIS_FLIP_TRESHOLD = 0.0

            if (handle.name === 'X' || handle.name === 'XYZX') {
              if (
                Math.abs(
                  alignVector
                    .copy(unitX)
                    .applyQuaternion(quaternion)
                    .dot(this.eye)
                ) > AXIS_HIDE_TRESHOLD
              ) {
                handle.scale.set(1e-10, 1e-10, 1e-10)
                handle.visible = false
              }
            }
            if (handle.name === 'Y' || handle.name === 'XYZY') {
              if (
                Math.abs(
                  alignVector
                    .copy(unitY)
                    .applyQuaternion(quaternion)
                    .dot(this.eye)
                ) > AXIS_HIDE_TRESHOLD
              ) {
                handle.scale.set(1e-10, 1e-10, 1e-10)
                handle.visible = false
              }
            }
            if (handle.name === 'Z' || handle.name === 'XYZZ') {
              if (
                Math.abs(
                  alignVector
                    .copy(unitZ)
                    .applyQuaternion(quaternion)
                    .dot(this.eye)
                ) > AXIS_HIDE_TRESHOLD
              ) {
                handle.scale.set(1e-10, 1e-10, 1e-10)
                handle.visible = false
              }
            }
            if (handle.name === 'XY') {
              if (
                Math.abs(
                  alignVector
                    .copy(unitZ)
                    .applyQuaternion(quaternion)
                    .dot(this.eye)
                ) < PLANE_HIDE_TRESHOLD
              ) {
                handle.scale.set(1e-10, 1e-10, 1e-10)
                handle.visible = false
              }
            }
            if (handle.name === 'YZ') {
              if (
                Math.abs(
                  alignVector
                    .copy(unitX)
                    .applyQuaternion(quaternion)
                    .dot(this.eye)
                ) < PLANE_HIDE_TRESHOLD
              ) {
                handle.scale.set(1e-10, 1e-10, 1e-10)
                handle.visible = false
              }
            }
            if (handle.name === 'XZ') {
              if (
                Math.abs(
                  alignVector
                    .copy(unitY)
                    .applyQuaternion(quaternion)
                    .dot(this.eye)
                ) < PLANE_HIDE_TRESHOLD
              ) {
                handle.scale.set(1e-10, 1e-10, 1e-10)
                handle.visible = false
              }
            }

            // Flip translate and scale axis ocluded behind another axis

            if (handle.name.search('X') !== -1) {
              if (
                alignVector
                  .copy(unitX)
                  .applyQuaternion(quaternion)
                  .dot(this.eye) < AXIS_FLIP_TRESHOLD
              ) {
                if (handle.tag === 'fwd') {
                  handle.visible = false
                } else {
                  handle.scale.x *= -1
                }
              } else if (handle.tag === 'bwd') {
                handle.visible = false
              }
            }

            if (handle.name.search('Y') !== -1) {
              if (
                alignVector
                  .copy(unitY)
                  .applyQuaternion(quaternion)
                  .dot(this.eye) < AXIS_FLIP_TRESHOLD
              ) {
                if (handle.tag === 'fwd') {
                  handle.visible = false
                } else {
                  handle.scale.y *= -1
                }
              } else if (handle.tag === 'bwd') {
                handle.visible = false
              }
            }

            if (handle.name.search('Z') !== -1) {
              if (
                alignVector
                  .copy(unitZ)
                  .applyQuaternion(quaternion)
                  .dot(this.eye) < AXIS_FLIP_TRESHOLD
              ) {
                if (handle.tag === 'fwd') {
                  handle.visible = false
                } else {
                  handle.scale.z *= -1
                }
              } else if (handle.tag === 'bwd') {
                handle.visible = false
              }
            }
          } else if (this.mode === 'rotate') {
            // Align handles to current local or world rotation

            tempQuaternion2.copy(quaternion)
            alignVector
              .copy(this.eye)
              .applyQuaternion(tempQuaternion.copy(quaternion).inverse())

            if (handle.name.search('E') !== -1) {
              handle.quaternion.setFromRotationMatrix(
                lookAtMatrix.lookAt(this.eye, zeroVector, unitY)
              )
            }

            if (handle.name === 'X') {
              tempQuaternion.setFromAxisAngle(
                unitX,
                Math.atan2(-alignVector.y, alignVector.z)
              )
              tempQuaternion.multiplyQuaternions(
                tempQuaternion2,
                tempQuaternion
              )
              handle.quaternion.copy(tempQuaternion)
            }

            if (handle.name === 'Y') {
              tempQuaternion.setFromAxisAngle(
                unitY,
                Math.atan2(alignVector.x, alignVector.z)
              )
              tempQuaternion.multiplyQuaternions(
                tempQuaternion2,
                tempQuaternion
              )
              handle.quaternion.copy(tempQuaternion)
            }

            if (handle.name === 'Z') {
              tempQuaternion.setFromAxisAngle(
                unitZ,
                Math.atan2(alignVector.y, alignVector.x)
              )
              tempQuaternion.multiplyQuaternions(
                tempQuaternion2,
                tempQuaternion
              )
              handle.quaternion.copy(tempQuaternion)
            }
          }

          // Hide disabled axes
          handle.visible =
            handle.visible && (handle.name.indexOf('X') === -1 || this.showX)
          handle.visible =
            handle.visible && (handle.name.indexOf('Y') === -1 || this.showY)
          handle.visible =
            handle.visible && (handle.name.indexOf('Z') === -1 || this.showZ)
          handle.visible =
            handle.visible &&
            (handle.name.indexOf('E') === -1 ||
              (this.showX && this.showY && this.showZ))

          // highlight selected axis

          handle.material._opacity =
            handle.material._opacity || handle.material.opacity
          handle.material._color =
            handle.material._color || handle.material.color.clone()

          handle.material.color.copy(handle.material._color)
          handle.material.opacity = handle.material._opacity

          if (!this.enabled) {
            handle.material.opacity *= 0.5
            handle.material.color.lerp(new THREE.Color(1, 1, 1), 0.5)
          } else if (this.axis) {
            if (handle.name === this.axis) {
              handle.material.opacity = 1.0
              handle.material.color.lerp(new THREE.Color(1, 1, 1), 0.5)
            } else if (
              this.axis.split('').some(function(a) {
                return handle.name === a
              })
            ) {
              handle.material.opacity = 1.0
              handle.material.color.lerp(new THREE.Color(1, 1, 1), 0.5)
            } else {
              handle.material.opacity *= 0.25
              handle.material.color.lerp(new THREE.Color(1, 1, 1), 0.5)
            }
          }
        }

        THREE.Object3D.prototype.updateMatrixWorld.call(this)
      }
    }

    THREE.TransformControlsGizmo.prototype = Object.assign(
      Object.create(THREE.Object3D.prototype),
      {
        constructor: THREE.TransformControlsGizmo,

        isTransformControlsGizmo: true
      }
    )

    THREE.TransformControlsPlane = function() {
      'use strict'

      THREE.Mesh.call(
        this,
        new THREE.PlaneBufferGeometry(100000, 100000, 2, 2),
        new THREE.MeshBasicMaterial({
          visible: false,
          wireframe: true,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.1
        })
      )

      this.type = 'TransformControlsPlane'

      var unitX = new THREE.Vector3(1, 0, 0)
      var unitY = new THREE.Vector3(0, 1, 0)
      var unitZ = new THREE.Vector3(0, 0, 1)

      var tempVector = new THREE.Vector3()
      var dirVector = new THREE.Vector3()
      var alignVector = new THREE.Vector3()
      var tempMatrix = new THREE.Matrix4()
      var identityQuaternion = new THREE.Quaternion()

      this.updateMatrixWorld = function() {
        var space = this.space

        this.position.copy(this.worldPosition)

        if (this.mode === 'scale') space = 'local' // scale always oriented to local rotation

        unitX
          .set(1, 0, 0)
          .applyQuaternion(
            space === 'local' ? this.worldQuaternion : identityQuaternion
          )
        unitY
          .set(0, 1, 0)
          .applyQuaternion(
            space === 'local' ? this.worldQuaternion : identityQuaternion
          )
        unitZ
          .set(0, 0, 1)
          .applyQuaternion(
            space === 'local' ? this.worldQuaternion : identityQuaternion
          )

        // Align the plane for current transform mode, axis and space.

        alignVector.copy(unitY)

        switch (this.mode) {
          case 'translate':
          case 'scale':
            switch (this.axis) {
              case 'X':
                alignVector.copy(this.eye).cross(unitX)
                dirVector.copy(unitX).cross(alignVector)
                break
              case 'Y':
                alignVector.copy(this.eye).cross(unitY)
                dirVector.copy(unitY).cross(alignVector)
                break
              case 'Z':
                alignVector.copy(this.eye).cross(unitZ)
                dirVector.copy(unitZ).cross(alignVector)
                break
              case 'XY':
                dirVector.copy(unitZ)
                break
              case 'YZ':
                dirVector.copy(unitX)
                break
              case 'XZ':
                alignVector.copy(unitZ)
                dirVector.copy(unitY)
                break
              case 'XYZ':
              case 'E':
                dirVector.set(0, 0, 0)
                break
            }
            break
          case 'rotate':
          default:
            // special case for rotate
            dirVector.set(0, 0, 0)
        }

        if (dirVector.length() === 0) {
          // If in rotate mode, make the plane parallel to camera
          this.quaternion.copy(this.cameraQuaternion)
        } else {
          tempMatrix.lookAt(tempVector.set(0, 0, 0), dirVector, alignVector)

          this.quaternion.setFromRotationMatrix(tempMatrix)
        }

        THREE.Object3D.prototype.updateMatrixWorld.call(this)
      }
    }

    THREE.TransformControlsPlane.prototype = Object.assign(
      Object.create(THREE.Mesh.prototype),
      {
        constructor: THREE.TransformControlsPlane,

        isTransformControlsPlane: true
      }
    )

    // "./thirdParty/threejs/loaders/GLTFLoader.js"
    // console.log('@@@@15 GLTFLoader')
    /**
     * @author Rich Tibbett / https://github.com/richtr
     * @author mrdoob / http://mrdoob.com/
     * @author Tony Parisi / http://www.tonyparisi.com/
     * @author Takahiro / https://github.com/takahirox
     * @author Don McCurdy / https://www.donmccurdy.com
     */
    THREE.GLTFLoader = (function() {
      function GLTFLoader(manager) {
        this.manager =
          manager !== undefined ? manager : THREE.DefaultLoadingManager
        this.dracoLoader = null
      }

      GLTFLoader.prototype = {
        constructor: GLTFLoader,

        crossOrigin: 'anonymous',

        load: function(url, onLoad, onProgress, onError) {
          var scope = this

          var resourcePath

          if (this.resourcePath !== undefined) {
            resourcePath = this.resourcePath
          } else if (this.path !== undefined) {
            resourcePath = this.path
          } else {
            resourcePath = THREE.LoaderUtils.extractUrlBase(url)
          }

          // Tells the LoadingManager to track an extra item, which resolves after
          // the model is fully loaded. This means the count of items loaded will
          // be incorrect, but ensures manager.onLoad() does not fire early.
          scope.manager.itemStart(url)

          var _onError = function(e) {
            if (onError) {
              onError(e)
            } else {
              console.error(e)
            }

            scope.manager.itemError(url)
            scope.manager.itemEnd(url)
          }

          var loader = new THREE.FileLoader(scope.manager)

          loader.setPath(this.path)
          loader.setResponseType('arraybuffer')

          loader.load(
            url,
            function(data) {
              try {
                scope.parse(
                  data,
                  resourcePath,
                  function(gltf) {
                    onLoad(gltf)

                    scope.manager.itemEnd(url)
                  },
                  _onError
                )
              } catch (e) {
                _onError(e)
              }
            },
            onProgress,
            _onError
          )
        },

        setCrossOrigin: function(value) {
          this.crossOrigin = value
          return this
        },

        setPath: function(value) {
          this.path = value
          return this
        },

        setResourcePath: function(value) {
          this.resourcePath = value
          return this
        },

        setDRACOLoader: function(dracoLoader) {
          this.dracoLoader = dracoLoader
          return this
        },

        parse: function(data, path, onLoad, onError) {
          var content
          var extensions = {}

          if (typeof data === 'string') {
            content = data
          } else {
            var magic = THREE.LoaderUtils.decodeText(new Uint8Array(data, 0, 4))

            if (magic === BINARY_EXTENSION_HEADER_MAGIC) {
              try {
                extensions[
                  EXTENSIONS.KHR_BINARY_GLTF
                ] = new GLTFBinaryExtension(data)
              } catch (error) {
                if (onError) onError(error)
                return
              }

              content = extensions[EXTENSIONS.KHR_BINARY_GLTF].content
            } else {
              content = THREE.LoaderUtils.decodeText(new Uint8Array(data))
            }
          }

          var json = JSON.parse(content)

          if (json.asset === undefined || json.asset.version[0] < 2) {
            if (onError)
              onError(
                new Error(
                  'THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported. Use LegacyGLTFLoader instead.'
                )
              )
            return
          }

          if (json.extensionsUsed) {
            for (var i = 0; i < json.extensionsUsed.length; ++i) {
              var extensionName = json.extensionsUsed[i]
              var extensionsRequired = json.extensionsRequired || []

              switch (extensionName) {
                case EXTENSIONS.KHR_LIGHTS_PUNCTUAL:
                  extensions[extensionName] = new GLTFLightsExtension(json)
                  break

                case EXTENSIONS.KHR_MATERIALS_UNLIT:
                  extensions[extensionName] = new GLTFMaterialsUnlitExtension(
                    json
                  )
                  break

                case EXTENSIONS.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS:
                  extensions[
                    extensionName
                  ] = new GLTFMaterialsPbrSpecularGlossinessExtension(json)
                  break

                case EXTENSIONS.KHR_DRACO_MESH_COMPRESSION:
                  extensions[
                    extensionName
                  ] = new GLTFDracoMeshCompressionExtension(
                    json,
                    this.dracoLoader
                  )
                  break

                case EXTENSIONS.MSFT_TEXTURE_DDS:
                  extensions[
                    EXTENSIONS.MSFT_TEXTURE_DDS
                  ] = new GLTFTextureDDSExtension()
                  break

                case EXTENSIONS.KHR_TEXTURE_TRANSFORM:
                  extensions[
                    EXTENSIONS.KHR_TEXTURE_TRANSFORM
                  ] = new GLTFTextureTransformExtension(json)
                  break

                default:
                  if (extensionsRequired.indexOf(extensionName) >= 0) {
                    console.warn(
                      'THREE.GLTFLoader: Unknown extension "' +
                        extensionName +
                        '".'
                    )
                  }
              }
            }
          }

          var parser = new GLTFParser(json, extensions, {
            path: path || this.resourcePath || '',
            crossOrigin: this.crossOrigin,
            manager: this.manager
          })

          parser.parse(onLoad, onError)
        }
      }

      /* GLTFREGISTRY */

      function GLTFRegistry() {
        var objects = {}

        return {
          get: function(key) {
            return objects[key]
          },

          add: function(key, object) {
            objects[key] = object
          },

          remove: function(key) {
            delete objects[key]
          },

          removeAll: function() {
            objects = {}
          }
        }
      }

      /*********************************/
      /********** EXTENSIONS ***********/
      /*********************************/

      var EXTENSIONS = {
        KHR_BINARY_GLTF: 'KHR_binary_glTF',
        KHR_DRACO_MESH_COMPRESSION: 'KHR_draco_mesh_compression',
        KHR_LIGHTS_PUNCTUAL: 'KHR_lights_punctual',
        KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS:
          'KHR_materials_pbrSpecularGlossiness',
        KHR_MATERIALS_UNLIT: 'KHR_materials_unlit',
        KHR_TEXTURE_TRANSFORM: 'KHR_texture_transform',
        MSFT_TEXTURE_DDS: 'MSFT_texture_dds'
      }

      /**
       * DDS Texture Extension
       *
       * Specification:
       * https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Vendor/MSFT_texture_dds
       *
       */
      function GLTFTextureDDSExtension() {
        if (!THREE.DDSLoader) {
          throw new Error(
            'THREE.GLTFLoader: Attempting to load .dds texture without importing THREE.DDSLoader'
          )
        }

        this.name = EXTENSIONS.MSFT_TEXTURE_DDS
        this.ddsLoader = new THREE.DDSLoader()
      }

      /**
       * Lights Extension
       *
       * Specification: PENDING
       */
      function GLTFLightsExtension(json) {
        this.name = EXTENSIONS.KHR_LIGHTS_PUNCTUAL

        var extension =
          (json.extensions &&
            json.extensions[EXTENSIONS.KHR_LIGHTS_PUNCTUAL]) ||
          {}
        this.lightDefs = extension.lights || []
      }

      GLTFLightsExtension.prototype.loadLight = function(lightIndex) {
        var lightDef = this.lightDefs[lightIndex]
        var lightNode

        var color = new THREE.Color(0xffffff)
        if (lightDef.color !== undefined) color.fromArray(lightDef.color)

        var range = lightDef.range !== undefined ? lightDef.range : 0

        switch (lightDef.type) {
          case 'directional':
            lightNode = new THREE.DirectionalLight(color)
            lightNode.target.position.set(0, 0, -1)
            lightNode.add(lightNode.target)
            break

          case 'point':
            lightNode = new THREE.PointLight(color)
            lightNode.distance = range
            break

          case 'spot':
            lightNode = new THREE.SpotLight(color)
            lightNode.distance = range
            // Handle spotlight properties.
            lightDef.spot = lightDef.spot || {}
            lightDef.spot.innerConeAngle =
              lightDef.spot.innerConeAngle !== undefined
                ? lightDef.spot.innerConeAngle
                : 0
            lightDef.spot.outerConeAngle =
              lightDef.spot.outerConeAngle !== undefined
                ? lightDef.spot.outerConeAngle
                : Math.PI / 4.0
            lightNode.angle = lightDef.spot.outerConeAngle
            lightNode.penumbra =
              1.0 - lightDef.spot.innerConeAngle / lightDef.spot.outerConeAngle
            lightNode.target.position.set(0, 0, -1)
            lightNode.add(lightNode.target)
            break

          default:
            throw new Error(
              'THREE.GLTFLoader: Unexpected light type, "' +
                lightDef.type +
                '".'
            )
        }

        // Some lights (e.g. spot) default to a position other than the origin. Reset the position
        // here, because node-level parsing will only override position if explicitly specified.
        lightNode.position.set(0, 0, 0)

        lightNode.decay = 2

        if (lightDef.intensity !== undefined)
          lightNode.intensity = lightDef.intensity

        lightNode.name = lightDef.name || 'light_' + lightIndex

        return Promise.resolve(lightNode)
      }

      /**
       * Unlit Materials Extension (pending)
       *
       * PR: https://github.com/KhronosGroup/glTF/pull/1163
       */
      function GLTFMaterialsUnlitExtension() {
        this.name = EXTENSIONS.KHR_MATERIALS_UNLIT
      }

      GLTFMaterialsUnlitExtension.prototype.getMaterialType = function() {
        return THREE.MeshBasicMaterial
      }

      GLTFMaterialsUnlitExtension.prototype.extendParams = function(
        materialParams,
        materialDef,
        parser
      ) {
        var pending = []

        materialParams.color = new THREE.Color(1.0, 1.0, 1.0)
        materialParams.opacity = 1.0

        var metallicRoughness = materialDef.pbrMetallicRoughness

        if (metallicRoughness) {
          if (Array.isArray(metallicRoughness.baseColorFactor)) {
            var array = metallicRoughness.baseColorFactor

            materialParams.color.fromArray(array)
            materialParams.opacity = array[3]
          }

          if (metallicRoughness.baseColorTexture !== undefined) {
            pending.push(
              parser.assignTexture(
                materialParams,
                'map',
                metallicRoughness.baseColorTexture
              )
            )
          }
        }

        return Promise.all(pending)
      }

      /* BINARY EXTENSION */

      var BINARY_EXTENSION_BUFFER_NAME = 'binary_glTF'
      var BINARY_EXTENSION_HEADER_MAGIC = 'glTF'
      var BINARY_EXTENSION_HEADER_LENGTH = 12
      var BINARY_EXTENSION_CHUNK_TYPES = { JSON: 0x4e4f534a, BIN: 0x004e4942 }

      function GLTFBinaryExtension(data) {
        this.name = EXTENSIONS.KHR_BINARY_GLTF
        this.content = null
        this.body = null

        var headerView = new DataView(data, 0, BINARY_EXTENSION_HEADER_LENGTH)

        this.header = {
          magic: THREE.LoaderUtils.decodeText(new Uint8Array(data.slice(0, 4))),
          version: headerView.getUint32(4, true),
          length: headerView.getUint32(8, true)
        }

        if (this.header.magic !== BINARY_EXTENSION_HEADER_MAGIC) {
          throw new Error('THREE.GLTFLoader: Unsupported glTF-Binary header.')
        } else if (this.header.version < 2.0) {
          throw new Error(
            'THREE.GLTFLoader: Legacy binary file detected. Use LegacyGLTFLoader instead.'
          )
        }

        var chunkView = new DataView(data, BINARY_EXTENSION_HEADER_LENGTH)
        var chunkIndex = 0

        while (chunkIndex < chunkView.byteLength) {
          var chunkLength = chunkView.getUint32(chunkIndex, true)
          chunkIndex += 4

          var chunkType = chunkView.getUint32(chunkIndex, true)
          chunkIndex += 4

          if (chunkType === BINARY_EXTENSION_CHUNK_TYPES.JSON) {
            var contentArray = new Uint8Array(
              data,
              BINARY_EXTENSION_HEADER_LENGTH + chunkIndex,
              chunkLength
            )
            this.content = THREE.LoaderUtils.decodeText(contentArray)
          } else if (chunkType === BINARY_EXTENSION_CHUNK_TYPES.BIN) {
            var byteOffset = BINARY_EXTENSION_HEADER_LENGTH + chunkIndex
            this.body = data.slice(byteOffset, byteOffset + chunkLength)
          }

          // Clients must ignore chunks with unknown types.

          chunkIndex += chunkLength
        }

        if (this.content === null) {
          throw new Error('THREE.GLTFLoader: JSON content not found.')
        }
      }

      /**
       * DRACO Mesh Compression Extension
       *
       * Specification: https://github.com/KhronosGroup/glTF/pull/874
       */
      function GLTFDracoMeshCompressionExtension(json, dracoLoader) {
        if (!dracoLoader) {
          throw new Error('THREE.GLTFLoader: No DRACOLoader instance provided.')
        }

        this.name = EXTENSIONS.KHR_DRACO_MESH_COMPRESSION
        this.json = json
        this.dracoLoader = dracoLoader
      }

      GLTFDracoMeshCompressionExtension.prototype.decodePrimitive = function(
        primitive,
        parser
      ) {
        var json = this.json
        var dracoLoader = this.dracoLoader
        var bufferViewIndex = primitive.extensions[this.name].bufferView
        var gltfAttributeMap = primitive.extensions[this.name].attributes
        var threeAttributeMap = {}
        var attributeNormalizedMap = {}
        var attributeTypeMap = {}

        for (var attributeName in gltfAttributeMap) {
          var threeAttributeName =
            ATTRIBUTES[attributeName] || attributeName.toLowerCase()

          threeAttributeMap[threeAttributeName] =
            gltfAttributeMap[attributeName]
        }

        for (attributeName in primitive.attributes) {
          var threeAttributeName =
            ATTRIBUTES[attributeName] || attributeName.toLowerCase()

          if (gltfAttributeMap[attributeName] !== undefined) {
            var accessorDef =
              json.accessors[primitive.attributes[attributeName]]
            var componentType = WEBGL_COMPONENT_TYPES[accessorDef.componentType]

            attributeTypeMap[threeAttributeName] = componentType
            attributeNormalizedMap[threeAttributeName] =
              accessorDef.normalized === true
          }
        }

        return parser
          .getDependency('bufferView', bufferViewIndex)
          .then(function(bufferView) {
            return new Promise(function(resolve) {
              dracoLoader.decodeDracoFile(
                bufferView,
                function(geometry) {
                  for (var attributeName in geometry.attributes) {
                    var attribute = geometry.attributes[attributeName]
                    var normalized = attributeNormalizedMap[attributeName]

                    if (normalized !== undefined)
                      attribute.normalized = normalized
                  }

                  resolve(geometry)
                },
                threeAttributeMap,
                attributeTypeMap
              )
            })
          })
      }

      /**
       * Texture Transform Extension
       *
       * Specification:
       */
      function GLTFTextureTransformExtension() {
        this.name = EXTENSIONS.KHR_TEXTURE_TRANSFORM
      }

      GLTFTextureTransformExtension.prototype.extendTexture = function(
        texture,
        transform
      ) {
        texture = texture.clone()

        if (transform.offset !== undefined) {
          texture.offset.fromArray(transform.offset)
        }

        if (transform.rotation !== undefined) {
          texture.rotation = transform.rotation
        }

        if (transform.scale !== undefined) {
          texture.repeat.fromArray(transform.scale)
        }

        if (transform.texCoord !== undefined) {
          console.warn(
            'THREE.GLTFLoader: Custom UV sets in "' +
              this.name +
              '" extension not yet supported.'
          )
        }

        texture.needsUpdate = true

        return texture
      }

      /**
       * Specular-Glossiness Extension
       *
       * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_materials_pbrSpecularGlossiness
       */
      function GLTFMaterialsPbrSpecularGlossinessExtension() {
        return {
          name: EXTENSIONS.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS,

          specularGlossinessParams: [
            'color',
            'map',
            'lightMap',
            'lightMapIntensity',
            'aoMap',
            'aoMapIntensity',
            'emissive',
            'emissiveIntensity',
            'emissiveMap',
            'bumpMap',
            'bumpScale',
            'normalMap',
            'displacementMap',
            'displacementScale',
            'displacementBias',
            'specularMap',
            'specular',
            'glossinessMap',
            'glossiness',
            'alphaMap',
            'envMap',
            'envMapIntensity',
            'refractionRatio'
          ],

          getMaterialType: function() {
            return THREE.ShaderMaterial
          },

          extendParams: function(materialParams, materialDef, parser) {
            var pbrSpecularGlossiness = materialDef.extensions[this.name]

            var shader = THREE.ShaderLib['standard']

            var uniforms = THREE.UniformsUtils.clone(shader.uniforms)

            var specularMapParsFragmentChunk = [
              '#ifdef USE_SPECULARMAP',
              '	uniform sampler2D specularMap;',
              '#endif'
            ].join('\n')

            var glossinessMapParsFragmentChunk = [
              '#ifdef USE_GLOSSINESSMAP',
              '	uniform sampler2D glossinessMap;',
              '#endif'
            ].join('\n')

            var specularMapFragmentChunk = [
              'vec3 specularFactor = specular;',
              '#ifdef USE_SPECULARMAP',
              '	vec4 texelSpecular = texture2D( specularMap, vUv );',
              '	texelSpecular = sRGBToLinear( texelSpecular );',
              '	// reads channel RGB, compatible with a glTF Specular-Glossiness (RGBA) texture',
              '	specularFactor *= texelSpecular.rgb;',
              '#endif'
            ].join('\n')

            var glossinessMapFragmentChunk = [
              'float glossinessFactor = glossiness;',
              '#ifdef USE_GLOSSINESSMAP',
              '	vec4 texelGlossiness = texture2D( glossinessMap, vUv );',
              '	// reads channel A, compatible with a glTF Specular-Glossiness (RGBA) texture',
              '	glossinessFactor *= texelGlossiness.a;',
              '#endif'
            ].join('\n')

            var lightPhysicalFragmentChunk = [
              'PhysicalMaterial material;',
              'material.diffuseColor = diffuseColor.rgb;',
              'material.specularRoughness = clamp( 1.0 - glossinessFactor, 0.04, 1.0 );',
              'material.specularColor = specularFactor.rgb;'
            ].join('\n')

            var fragmentShader = shader.fragmentShader
              .replace('uniform float roughness;', 'uniform vec3 specular;')
              .replace('uniform float metalness;', 'uniform float glossiness;')
              .replace(
                '#include <roughnessmap_pars_fragment>',
                specularMapParsFragmentChunk
              )
              .replace(
                '#include <metalnessmap_pars_fragment>',
                glossinessMapParsFragmentChunk
              )
              .replace(
                '#include <roughnessmap_fragment>',
                specularMapFragmentChunk
              )
              .replace(
                '#include <metalnessmap_fragment>',
                glossinessMapFragmentChunk
              )
              .replace(
                '#include <lights_physical_fragment>',
                lightPhysicalFragmentChunk
              )

            delete uniforms.roughness
            delete uniforms.metalness
            delete uniforms.roughnessMap
            delete uniforms.metalnessMap

            uniforms.specular = { value: new THREE.Color().setHex(0x111111) }
            uniforms.glossiness = { value: 0.5 }
            uniforms.specularMap = { value: null }
            uniforms.glossinessMap = { value: null }

            materialParams.vertexShader = shader.vertexShader
            materialParams.fragmentShader = fragmentShader
            materialParams.uniforms = uniforms
            materialParams.defines = { STANDARD: '' }

            materialParams.color = new THREE.Color(1.0, 1.0, 1.0)
            materialParams.opacity = 1.0

            var pending = []

            if (Array.isArray(pbrSpecularGlossiness.diffuseFactor)) {
              var array = pbrSpecularGlossiness.diffuseFactor

              materialParams.color.fromArray(array)
              materialParams.opacity = array[3]
            }

            if (pbrSpecularGlossiness.diffuseTexture !== undefined) {
              pending.push(
                parser.assignTexture(
                  materialParams,
                  'map',
                  pbrSpecularGlossiness.diffuseTexture
                )
              )
            }

            materialParams.emissive = new THREE.Color(0.0, 0.0, 0.0)
            materialParams.glossiness =
              pbrSpecularGlossiness.glossinessFactor !== undefined
                ? pbrSpecularGlossiness.glossinessFactor
                : 1.0
            materialParams.specular = new THREE.Color(1.0, 1.0, 1.0)

            if (Array.isArray(pbrSpecularGlossiness.specularFactor)) {
              materialParams.specular.fromArray(
                pbrSpecularGlossiness.specularFactor
              )
            }

            if (pbrSpecularGlossiness.specularGlossinessTexture !== undefined) {
              var specGlossMapDef =
                pbrSpecularGlossiness.specularGlossinessTexture
              pending.push(
                parser.assignTexture(
                  materialParams,
                  'glossinessMap',
                  specGlossMapDef
                )
              )
              pending.push(
                parser.assignTexture(
                  materialParams,
                  'specularMap',
                  specGlossMapDef
                )
              )
            }

            return Promise.all(pending)
          },

          createMaterial: function(params) {
            // setup material properties based on MeshStandardMaterial for Specular-Glossiness

            var material = new THREE.ShaderMaterial({
              defines: params.defines,
              vertexShader: params.vertexShader,
              fragmentShader: params.fragmentShader,
              uniforms: params.uniforms,
              fog: true,
              lights: true,
              opacity: params.opacity,
              transparent: params.transparent
            })

            material.isGLTFSpecularGlossinessMaterial = true

            material.color = params.color

            material.map = params.map === undefined ? null : params.map

            material.lightMap = null
            material.lightMapIntensity = 1.0

            material.aoMap = params.aoMap === undefined ? null : params.aoMap
            material.aoMapIntensity = 1.0

            material.emissive = params.emissive
            material.emissiveIntensity = 1.0
            material.emissiveMap =
              params.emissiveMap === undefined ? null : params.emissiveMap

            material.bumpMap =
              params.bumpMap === undefined ? null : params.bumpMap
            material.bumpScale = 1

            material.normalMap =
              params.normalMap === undefined ? null : params.normalMap

            if (params.normalScale) material.normalScale = params.normalScale

            material.displacementMap = null
            material.displacementScale = 1
            material.displacementBias = 0

            material.specularMap =
              params.specularMap === undefined ? null : params.specularMap
            material.specular = params.specular

            material.glossinessMap =
              params.glossinessMap === undefined ? null : params.glossinessMap
            material.glossiness = params.glossiness

            material.alphaMap = null

            material.envMap = params.envMap === undefined ? null : params.envMap
            material.envMapIntensity = 1.0

            material.refractionRatio = 0.98

            material.extensions.derivatives = true

            return material
          },

          /**
           * Clones a GLTFSpecularGlossinessMaterial instance. The ShaderMaterial.copy() method can
           * copy only properties it knows about or inherits, and misses many properties that would
           * normally be defined by MeshStandardMaterial.
           *
           * This method allows GLTFSpecularGlossinessMaterials to be cloned in the process of
           * loading a glTF model, but cloning later (e.g. by the user) would require these changes
           * AND also updating `.onBeforeRender` on the parent mesh.
           *
           * @param  {THREE.ShaderMaterial} source
           * @return {THREE.ShaderMaterial}
           */
          cloneMaterial: function(source) {
            var target = source.clone()

            target.isGLTFSpecularGlossinessMaterial = true

            var params = this.specularGlossinessParams

            for (var i = 0, il = params.length; i < il; i++) {
              target[params[i]] = source[params[i]]
            }

            return target
          },

          // Here's based on refreshUniformsCommon() and refreshUniformsStandard() in WebGLRenderer.
          refreshUniforms: function(
            renderer,
            scene,
            camera,
            geometry,
            material,
            group
          ) {
            if (material.isGLTFSpecularGlossinessMaterial !== true) {
              return
            }

            var uniforms = material.uniforms
            var defines = material.defines

            uniforms.opacity.value = material.opacity

            uniforms.diffuse.value.copy(material.color)
            uniforms.emissive.value
              .copy(material.emissive)
              .multiplyScalar(material.emissiveIntensity)

            uniforms.map.value = material.map
            uniforms.specularMap.value = material.specularMap
            uniforms.alphaMap.value = material.alphaMap

            uniforms.lightMap.value = material.lightMap
            uniforms.lightMapIntensity.value = material.lightMapIntensity

            uniforms.aoMap.value = material.aoMap
            uniforms.aoMapIntensity.value = material.aoMapIntensity

            // uv repeat and offset setting priorities
            // 1. color map
            // 2. specular map
            // 3. normal map
            // 4. bump map
            // 5. alpha map
            // 6. emissive map

            var uvScaleMap

            if (material.map) {
              uvScaleMap = material.map
            } else if (material.specularMap) {
              uvScaleMap = material.specularMap
            } else if (material.displacementMap) {
              uvScaleMap = material.displacementMap
            } else if (material.normalMap) {
              uvScaleMap = material.normalMap
            } else if (material.bumpMap) {
              uvScaleMap = material.bumpMap
            } else if (material.glossinessMap) {
              uvScaleMap = material.glossinessMap
            } else if (material.alphaMap) {
              uvScaleMap = material.alphaMap
            } else if (material.emissiveMap) {
              uvScaleMap = material.emissiveMap
            }

            if (uvScaleMap !== undefined) {
              // backwards compatibility
              if (uvScaleMap.isWebGLRenderTarget) {
                uvScaleMap = uvScaleMap.texture
              }

              if (uvScaleMap.matrixAutoUpdate === true) {
                uvScaleMap.updateMatrix()
              }

              uniforms.uvTransform.value.copy(uvScaleMap.matrix)
            }

            if (material.envMap) {
              uniforms.envMap.value = material.envMap
              uniforms.envMapIntensity.value = material.envMapIntensity

              // don't flip CubeTexture envMaps, flip everything else:
              //  WebGLRenderTargetCube will be flipped for backwards compatibility
              //  WebGLRenderTargetCube.texture will be flipped because it's a Texture and NOT a CubeTexture
              // this check must be handled differently, or removed entirely, if WebGLRenderTargetCube uses a CubeTexture in the future
              uniforms.flipEnvMap.value = material.envMap.isCubeTexture ? -1 : 1

              uniforms.reflectivity.value = material.reflectivity
              uniforms.refractionRatio.value = material.refractionRatio

              uniforms.maxMipLevel.value = renderer.properties.get(
                material.envMap
              ).__maxMipLevel
            }

            uniforms.specular.value.copy(material.specular)
            uniforms.glossiness.value = material.glossiness

            uniforms.glossinessMap.value = material.glossinessMap

            uniforms.emissiveMap.value = material.emissiveMap
            uniforms.bumpMap.value = material.bumpMap
            uniforms.normalMap.value = material.normalMap

            uniforms.displacementMap.value = material.displacementMap
            uniforms.displacementScale.value = material.displacementScale
            uniforms.displacementBias.value = material.displacementBias

            if (
              uniforms.glossinessMap.value !== null &&
              defines.USE_GLOSSINESSMAP === undefined
            ) {
              defines.USE_GLOSSINESSMAP = ''
              // set USE_ROUGHNESSMAP to enable vUv
              defines.USE_ROUGHNESSMAP = ''
            }

            if (
              uniforms.glossinessMap.value === null &&
              defines.USE_GLOSSINESSMAP !== undefined
            ) {
              delete defines.USE_GLOSSINESSMAP
              delete defines.USE_ROUGHNESSMAP
            }
          }
        }
      }

      /*********************************/
      /********** INTERPOLATION ********/
      /*********************************/

      // Spline Interpolation
      // Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#appendix-c-spline-interpolation
      function GLTFCubicSplineInterpolant(
        parameterPositions,
        sampleValues,
        sampleSize,
        resultBuffer
      ) {
        THREE.Interpolant.call(
          this,
          parameterPositions,
          sampleValues,
          sampleSize,
          resultBuffer
        )
      }

      GLTFCubicSplineInterpolant.prototype = Object.create(
        THREE.Interpolant.prototype
      )
      GLTFCubicSplineInterpolant.prototype.constructor = GLTFCubicSplineInterpolant

      GLTFCubicSplineInterpolant.prototype.copySampleValue_ = function(index) {
        // Copies a sample value to the result buffer. See description of glTF
        // CUBICSPLINE values layout in interpolate_() function below.

        var result = this.resultBuffer,
          values = this.sampleValues,
          valueSize = this.valueSize,
          offset = index * valueSize * 3 + valueSize

        for (var i = 0; i !== valueSize; i++) {
          result[i] = values[offset + i]
        }

        return result
      }

      GLTFCubicSplineInterpolant.prototype.beforeStart_ =
        GLTFCubicSplineInterpolant.prototype.copySampleValue_

      GLTFCubicSplineInterpolant.prototype.afterEnd_ =
        GLTFCubicSplineInterpolant.prototype.copySampleValue_

      GLTFCubicSplineInterpolant.prototype.interpolate_ = function(
        i1,
        t0,
        t,
        t1
      ) {
        var result = this.resultBuffer
        var values = this.sampleValues
        var stride = this.valueSize

        var stride2 = stride * 2
        var stride3 = stride * 3

        var td = t1 - t0

        var p = (t - t0) / td
        var pp = p * p
        var ppp = pp * p

        var offset1 = i1 * stride3
        var offset0 = offset1 - stride3

        var s2 = -2 * ppp + 3 * pp
        var s3 = ppp - pp
        var s0 = 1 - s2
        var s1 = s3 - pp + p

        // Layout of keyframe output values for CUBICSPLINE animations:
        //   [ inTangent_1, splineVertex_1, outTangent_1, inTangent_2, splineVertex_2, ... ]
        for (var i = 0; i !== stride; i++) {
          var p0 = values[offset0 + i + stride] // splineVertex_k
          var m0 = values[offset0 + i + stride2] * td // outTangent_k * (t_k+1 - t_k)
          var p1 = values[offset1 + i + stride] // splineVertex_k+1
          var m1 = values[offset1 + i] * td // inTangent_k+1 * (t_k+1 - t_k)

          result[i] = s0 * p0 + s1 * m0 + s2 * p1 + s3 * m1
        }

        return result
      }

      /*********************************/
      /********** INTERNALS ************/
      /*********************************/

      /* CONSTANTS */

      var WEBGL_CONSTANTS = {
        FLOAT: 5126,
        //FLOAT_MAT2: 35674,
        FLOAT_MAT3: 35675,
        FLOAT_MAT4: 35676,
        FLOAT_VEC2: 35664,
        FLOAT_VEC3: 35665,
        FLOAT_VEC4: 35666,
        LINEAR: 9729,
        REPEAT: 10497,
        SAMPLER_2D: 35678,
        POINTS: 0,
        LINES: 1,
        LINE_LOOP: 2,
        LINE_STRIP: 3,
        TRIANGLES: 4,
        TRIANGLE_STRIP: 5,
        TRIANGLE_FAN: 6,
        UNSIGNED_BYTE: 5121,
        UNSIGNED_SHORT: 5123
      }

      var WEBGL_TYPE = {
        5126: Number,
        //35674: THREE.Matrix2,
        35675: THREE.Matrix3,
        35676: THREE.Matrix4,
        35664: THREE.Vector2,
        35665: THREE.Vector3,
        35666: THREE.Vector4,
        35678: THREE.Texture
      }

      var WEBGL_COMPONENT_TYPES = {
        5120: Int8Array,
        5121: Uint8Array,
        5122: Int16Array,
        5123: Uint16Array,
        5125: Uint32Array,
        5126: Float32Array
      }

      var WEBGL_FILTERS = {
        9728: THREE.NearestFilter,
        9729: THREE.LinearFilter,
        9984: THREE.NearestMipMapNearestFilter,
        9985: THREE.LinearMipMapNearestFilter,
        9986: THREE.NearestMipMapLinearFilter,
        9987: THREE.LinearMipMapLinearFilter
      }

      var WEBGL_WRAPPINGS = {
        33071: THREE.ClampToEdgeWrapping,
        33648: THREE.MirroredRepeatWrapping,
        10497: THREE.RepeatWrapping
      }

      var WEBGL_SIDES = {
        1028: THREE.BackSide, // Culling front
        1029: THREE.FrontSide // Culling back
        //1032: THREE.NoSide   // Culling front and back, what to do?
      }

      var WEBGL_DEPTH_FUNCS = {
        512: THREE.NeverDepth,
        513: THREE.LessDepth,
        514: THREE.EqualDepth,
        515: THREE.LessEqualDepth,
        516: THREE.GreaterEqualDepth,
        517: THREE.NotEqualDepth,
        518: THREE.GreaterEqualDepth,
        519: THREE.AlwaysDepth
      }

      var WEBGL_BLEND_EQUATIONS = {
        32774: THREE.AddEquation,
        32778: THREE.SubtractEquation,
        32779: THREE.ReverseSubtractEquation
      }

      var WEBGL_BLEND_FUNCS = {
        0: THREE.ZeroFactor,
        1: THREE.OneFactor,
        768: THREE.SrcColorFactor,
        769: THREE.OneMinusSrcColorFactor,
        770: THREE.SrcAlphaFactor,
        771: THREE.OneMinusSrcAlphaFactor,
        772: THREE.DstAlphaFactor,
        773: THREE.OneMinusDstAlphaFactor,
        774: THREE.DstColorFactor,
        775: THREE.OneMinusDstColorFactor,
        776: THREE.SrcAlphaSaturateFactor
        // The followings are not supported by Three.js yet
        //32769: CONSTANT_COLOR,
        //32770: ONE_MINUS_CONSTANT_COLOR,
        //32771: CONSTANT_ALPHA,
        //32772: ONE_MINUS_CONSTANT_COLOR
      }

      var WEBGL_TYPE_SIZES = {
        SCALAR: 1,
        VEC2: 2,
        VEC3: 3,
        VEC4: 4,
        MAT2: 4,
        MAT3: 9,
        MAT4: 16
      }

      var ATTRIBUTES = {
        POSITION: 'position',
        NORMAL: 'normal',
        TANGENT: 'tangent',
        TEXCOORD_0: 'uv',
        TEXCOORD_1: 'uv2',
        COLOR_0: 'color',
        WEIGHTS_0: 'skinWeight',
        JOINTS_0: 'skinIndex'
      }

      var PATH_PROPERTIES = {
        scale: 'scale',
        translation: 'position',
        rotation: 'quaternion',
        weights: 'morphTargetInfluences'
      }

      var INTERPOLATION = {
        CUBICSPLINE: undefined, // We use a custom interpolant (GLTFCubicSplineInterpolation) for CUBICSPLINE tracks. Each
        // keyframe track will be initialized with a default interpolation type, then modified.
        LINEAR: THREE.InterpolateLinear,
        STEP: THREE.InterpolateDiscrete
      }

      var STATES_ENABLES = {
        2884: 'CULL_FACE',
        2929: 'DEPTH_TEST',
        3042: 'BLEND',
        3089: 'SCISSOR_TEST',
        32823: 'POLYGON_OFFSET_FILL',
        32926: 'SAMPLE_ALPHA_TO_COVERAGE'
      }

      var ALPHA_MODES = {
        OPAQUE: 'OPAQUE',
        MASK: 'MASK',
        BLEND: 'BLEND'
      }

      var MIME_TYPE_FORMATS = {
        'image/png': THREE.RGBAFormat,
        'image/jpeg': THREE.RGBFormat
      }

      /* UTILITY FUNCTIONS */

      function resolveURL(url, path) {
        // Invalid URL
        if (typeof url !== 'string' || url === '') return ''

        // Absolute URL http://,https://,//
        if (/^(https?:)?\/\//i.test(url)) return url

        // Data URI
        if (/^data:.*,.*$/i.test(url)) return url

        // Blob URL
        if (/^blob:.*$/i.test(url)) return url

        // Relative URL
        return path + url
      }

      var defaultMaterial

      /**
       * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#default-material
       */
      function createDefaultMaterial() {
        defaultMaterial =
          defaultMaterial ||
          new THREE.MeshStandardMaterial({
            color: 0xffffff,
            emissive: 0x000000,
            metalness: 1,
            roughness: 1,
            transparent: false,
            depthTest: true,
            side: THREE.FrontSide
          })

        return defaultMaterial
      }

      function addUnknownExtensionsToUserData(
        knownExtensions,
        object,
        objectDef
      ) {
        // Add unknown glTF extensions to an object's userData.

        for (var name in objectDef.extensions) {
          if (knownExtensions[name] === undefined) {
            object.userData.gltfExtensions =
              object.userData.gltfExtensions || {}
            object.userData.gltfExtensions[name] = objectDef.extensions[name]
          }
        }
      }

      /**
       * @param {THREE.Object3D|THREE.Material|THREE.BufferGeometry} object
       * @param {GLTF.definition} gltfDef
       */
      function assignExtrasToUserData(object, gltfDef) {
        if (gltfDef.extras !== undefined) {
          if (typeof gltfDef.extras === 'object') {
            object.userData = gltfDef.extras
          } else {
            console.warn(
              'THREE.GLTFLoader: Ignoring primitive type .extras, ' +
                gltfDef.extras
            )
          }
        }
      }

      /**
       * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#morph-targets
       *
       * @param {THREE.BufferGeometry} geometry
       * @param {Array<GLTF.Target>} targets
       * @param {GLTFParser} parser
       * @return {Promise<THREE.BufferGeometry>}
       */
      function addMorphTargets(geometry, targets, parser) {
        var hasMorphPosition = false
        var hasMorphNormal = false

        for (var i = 0, il = targets.length; i < il; i++) {
          var target = targets[i]

          if (target.POSITION !== undefined) hasMorphPosition = true
          if (target.NORMAL !== undefined) hasMorphNormal = true

          if (hasMorphPosition && hasMorphNormal) break
        }

        if (!hasMorphPosition && !hasMorphNormal)
          return Promise.resolve(geometry)

        var pendingPositionAccessors = []
        var pendingNormalAccessors = []

        for (var i = 0, il = targets.length; i < il; i++) {
          var target = targets[i]

          if (hasMorphPosition) {
            var pendingAccessor =
              target.POSITION !== undefined
                ? parser.getDependency('accessor', target.POSITION)
                : geometry.attributes.position

            pendingPositionAccessors.push(pendingAccessor)
          }

          if (hasMorphNormal) {
            var pendingAccessor =
              target.NORMAL !== undefined
                ? parser.getDependency('accessor', target.NORMAL)
                : geometry.attributes.normal

            pendingNormalAccessors.push(pendingAccessor)
          }
        }

        return Promise.all([
          Promise.all(pendingPositionAccessors),
          Promise.all(pendingNormalAccessors)
        ]).then(function(accessors) {
          var morphPositions = accessors[0]
          var morphNormals = accessors[1]

          // Clone morph target accessors before modifying them.

          for (var i = 0, il = morphPositions.length; i < il; i++) {
            if (geometry.attributes.position === morphPositions[i]) continue

            morphPositions[i] = cloneBufferAttribute(morphPositions[i])
          }

          for (var i = 0, il = morphNormals.length; i < il; i++) {
            if (geometry.attributes.normal === morphNormals[i]) continue

            morphNormals[i] = cloneBufferAttribute(morphNormals[i])
          }

          for (var i = 0, il = targets.length; i < il; i++) {
            var target = targets[i]
            var attributeName = 'morphTarget' + i

            if (hasMorphPosition) {
              // Three.js morph position is absolute value. The formula is
              //   basePosition
              //     + weight0 * ( morphPosition0 - basePosition )
              //     + weight1 * ( morphPosition1 - basePosition )
              //     ...
              // while the glTF one is relative
              //   basePosition
              //     + weight0 * glTFmorphPosition0
              //     + weight1 * glTFmorphPosition1
              //     ...
              // then we need to convert from relative to absolute here.

              if (target.POSITION !== undefined) {
                var positionAttribute = morphPositions[i]
                positionAttribute.name = attributeName

                var position = geometry.attributes.position

                for (var j = 0, jl = positionAttribute.count; j < jl; j++) {
                  positionAttribute.setXYZ(
                    j,
                    positionAttribute.getX(j) + position.getX(j),
                    positionAttribute.getY(j) + position.getY(j),
                    positionAttribute.getZ(j) + position.getZ(j)
                  )
                }
              }
            }

            if (hasMorphNormal) {
              // see target.POSITION's comment

              if (target.NORMAL !== undefined) {
                var normalAttribute = morphNormals[i]
                normalAttribute.name = attributeName

                var normal = geometry.attributes.normal

                for (var j = 0, jl = normalAttribute.count; j < jl; j++) {
                  normalAttribute.setXYZ(
                    j,
                    normalAttribute.getX(j) + normal.getX(j),
                    normalAttribute.getY(j) + normal.getY(j),
                    normalAttribute.getZ(j) + normal.getZ(j)
                  )
                }
              }
            }
          }

          if (hasMorphPosition)
            geometry.morphAttributes.position = morphPositions
          if (hasMorphNormal) geometry.morphAttributes.normal = morphNormals

          return geometry
        })
      }

      /**
       * @param {THREE.Mesh} mesh
       * @param {GLTF.Mesh} meshDef
       */
      function updateMorphTargets(mesh, meshDef) {
        mesh.updateMorphTargets()

        if (meshDef.weights !== undefined) {
          for (var i = 0, il = meshDef.weights.length; i < il; i++) {
            mesh.morphTargetInfluences[i] = meshDef.weights[i]
          }
        }

        // .extras has user-defined data, so check that .extras.targetNames is an array.
        if (meshDef.extras && Array.isArray(meshDef.extras.targetNames)) {
          var targetNames = meshDef.extras.targetNames

          if (mesh.morphTargetInfluences.length === targetNames.length) {
            mesh.morphTargetDictionary = {}

            for (var i = 0, il = targetNames.length; i < il; i++) {
              mesh.morphTargetDictionary[targetNames[i]] = i
            }
          } else {
            console.warn(
              'THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.'
            )
          }
        }
      }
      function isObjectEqual(a, b) {
        if (Object.keys(a).length !== Object.keys(b).length) return false

        for (var key in a) {
          if (a[key] !== b[key]) return false
        }

        return true
      }

      function createPrimitiveKey(primitiveDef) {
        var dracoExtension =
          primitiveDef.extensions &&
          primitiveDef.extensions[EXTENSIONS.KHR_DRACO_MESH_COMPRESSION]
        var geometryKey

        if (dracoExtension) {
          geometryKey =
            'draco:' +
            dracoExtension.bufferView +
            ':' +
            dracoExtension.indices +
            ':' +
            createAttributesKey(dracoExtension.attributes)
        } else {
          geometryKey =
            primitiveDef.indices +
            ':' +
            createAttributesKey(primitiveDef.attributes) +
            ':' +
            primitiveDef.mode
        }

        return geometryKey
      }

      function createAttributesKey(attributes) {
        var attributesKey = ''

        var keys = Object.keys(attributes).sort()

        for (var i = 0, il = keys.length; i < il; i++) {
          attributesKey += keys[i] + ':' + attributes[keys[i]] + ';'
        }

        return attributesKey
      }

      function cloneBufferAttribute(attribute) {
        if (attribute.isInterleavedBufferAttribute) {
          var count = attribute.count
          var itemSize = attribute.itemSize
          var array = attribute.array.slice(0, count * itemSize)

          for (var i = 0, j = 0; i < count; ++i) {
            array[j++] = attribute.getX(i)
            if (itemSize >= 2) array[j++] = attribute.getY(i)
            if (itemSize >= 3) array[j++] = attribute.getZ(i)
            if (itemSize >= 4) array[j++] = attribute.getW(i)
          }

          return new THREE.BufferAttribute(
            array,
            itemSize,
            attribute.normalized
          )
        }

        return attribute.clone()
      }

      /* GLTF PARSER */

      function GLTFParser(json, extensions, options) {
        this.json = json || {}
        this.extensions = extensions || {}
        this.options = options || {}

        // loader object cache
        this.cache = new GLTFRegistry()

        // BufferGeometry caching
        this.primitiveCache = {}

        this.textureLoader = new THREE.TextureLoader(this.options.manager)
        this.textureLoader.setCrossOrigin(this.options.crossOrigin)

        this.fileLoader = new THREE.FileLoader(this.options.manager)
        this.fileLoader.setResponseType('arraybuffer')
      }

      GLTFParser.prototype.parse = function(onLoad, onError) {
        var parser = this
        var json = this.json
        var extensions = this.extensions

        // Clear the loader cache
        this.cache.removeAll()

        // Mark the special nodes/meshes in json for efficient parse
        this.markDefs()

        Promise.all([
          this.getDependencies('scene'),
          this.getDependencies('animation'),
          this.getDependencies('camera')
        ])
          .then(function(dependencies) {
            var result = {
              scene: dependencies[0][json.scene || 0],
              scenes: dependencies[0],
              animations: dependencies[1],
              cameras: dependencies[2],
              asset: json.asset,
              parser: parser,
              userData: {}
            }

            addUnknownExtensionsToUserData(extensions, result, json)

            onLoad(result)
          })
          .catch(onError)
      }

      /**
       * Marks the special nodes/meshes in json for efficient parse.
       */
      GLTFParser.prototype.markDefs = function() {
        var nodeDefs = this.json.nodes || []
        var skinDefs = this.json.skins || []
        var meshDefs = this.json.meshes || []

        var meshReferences = {}
        var meshUses = {}

        // Nothing in the node definition indicates whether it is a Bone or an
        // Object3D. Use the skins' joint references to mark bones.
        for (
          var skinIndex = 0, skinLength = skinDefs.length;
          skinIndex < skinLength;
          skinIndex++
        ) {
          var joints = skinDefs[skinIndex].joints

          for (var i = 0, il = joints.length; i < il; i++) {
            nodeDefs[joints[i]].isBone = true
          }
        }

        // Meshes can (and should) be reused by multiple nodes in a glTF asset. To
        // avoid having more than one THREE.Mesh with the same name, count
        // references and rename instances below.
        //
        // Example: CesiumMilkTruck sample model reuses "Wheel" meshes.
        for (
          var nodeIndex = 0, nodeLength = nodeDefs.length;
          nodeIndex < nodeLength;
          nodeIndex++
        ) {
          var nodeDef = nodeDefs[nodeIndex]

          if (nodeDef.mesh !== undefined) {
            if (meshReferences[nodeDef.mesh] === undefined) {
              meshReferences[nodeDef.mesh] = meshUses[nodeDef.mesh] = 0
            }

            meshReferences[nodeDef.mesh]++

            // Nothing in the mesh definition indicates whether it is
            // a SkinnedMesh or Mesh. Use the node's mesh reference
            // to mark SkinnedMesh if node has skin.
            if (nodeDef.skin !== undefined) {
              meshDefs[nodeDef.mesh].isSkinnedMesh = true
            }
          }
        }

        this.json.meshReferences = meshReferences
        this.json.meshUses = meshUses
      }

      /**
       * Requests the specified dependency asynchronously, with caching.
       * @param {string} type
       * @param {number} index
       * @return {Promise<THREE.Object3D|THREE.Material|THREE.Texture|THREE.AnimationClip|ArrayBuffer|Object>}
       */
      GLTFParser.prototype.getDependency = function(type, index) {
        var cacheKey = type + ':' + index
        var dependency = this.cache.get(cacheKey)

        if (!dependency) {
          switch (type) {
            case 'scene':
              dependency = this.loadScene(index)
              break

            case 'node':
              dependency = this.loadNode(index)
              break

            case 'mesh':
              dependency = this.loadMesh(index)
              break

            case 'accessor':
              dependency = this.loadAccessor(index)
              break

            case 'bufferView':
              dependency = this.loadBufferView(index)
              break

            case 'buffer':
              dependency = this.loadBuffer(index)
              break

            case 'material':
              dependency = this.loadMaterial(index)
              break

            case 'texture':
              dependency = this.loadTexture(index)
              break

            case 'skin':
              dependency = this.loadSkin(index)
              break

            case 'animation':
              dependency = this.loadAnimation(index)
              break

            case 'camera':
              dependency = this.loadCamera(index)
              break

            case 'light':
              dependency = this.extensions[
                EXTENSIONS.KHR_LIGHTS_PUNCTUAL
              ].loadLight(index)
              break

            default:
              throw new Error('Unknown type: ' + type)
          }

          this.cache.add(cacheKey, dependency)
        }

        return dependency
      }

      /**
       * Requests all dependencies of the specified type asynchronously, with caching.
       * @param {string} type
       * @return {Promise<Array<Object>>}
       */
      GLTFParser.prototype.getDependencies = function(type) {
        var dependencies = this.cache.get(type)

        if (!dependencies) {
          var parser = this
          var defs = this.json[type + (type === 'mesh' ? 'es' : 's')] || []

          dependencies = Promise.all(
            defs.map(function(def, index) {
              return parser.getDependency(type, index)
            })
          )

          this.cache.add(type, dependencies)
        }

        return dependencies
      }

      /**
       * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#buffers-and-buffer-views
       * @param {number} bufferIndex
       * @return {Promise<ArrayBuffer>}
       */
      GLTFParser.prototype.loadBuffer = function(bufferIndex) {
        var bufferDef = this.json.buffers[bufferIndex]
        var loader = this.fileLoader

        if (bufferDef.type && bufferDef.type !== 'arraybuffer') {
          throw new Error(
            'THREE.GLTFLoader: ' +
              bufferDef.type +
              ' buffer type is not supported.'
          )
        }

        // If present, GLB container is required to be the first buffer.
        if (bufferDef.uri === undefined && bufferIndex === 0) {
          return Promise.resolve(
            this.extensions[EXTENSIONS.KHR_BINARY_GLTF].body
          )
        }

        var options = this.options

        return new Promise(function(resolve, reject) {
          loader.load(
            resolveURL(bufferDef.uri, options.path),
            resolve,
            undefined,
            function() {
              reject(
                new Error(
                  'THREE.GLTFLoader: Failed to load buffer "' +
                    bufferDef.uri +
                    '".'
                )
              )
            }
          )
        })
      }

      /**
       * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#buffers-and-buffer-views
       * @param {number} bufferViewIndex
       * @return {Promise<ArrayBuffer>}
       */
      GLTFParser.prototype.loadBufferView = function(bufferViewIndex) {
        var bufferViewDef = this.json.bufferViews[bufferViewIndex]

        return this.getDependency('buffer', bufferViewDef.buffer).then(function(
          buffer
        ) {
          var byteLength = bufferViewDef.byteLength || 0
          var byteOffset = bufferViewDef.byteOffset || 0
          return buffer.slice(byteOffset, byteOffset + byteLength)
        })
      }

      /**
       * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#accessors
       * @param {number} accessorIndex
       * @return {Promise<THREE.BufferAttribute|THREE.InterleavedBufferAttribute>}
       */
      GLTFParser.prototype.loadAccessor = function(accessorIndex) {
        var parser = this
        var json = this.json

        var accessorDef = this.json.accessors[accessorIndex]

        if (
          accessorDef.bufferView === undefined &&
          accessorDef.sparse === undefined
        ) {
          // Ignore empty accessors, which may be used to declare runtime
          // information about attributes coming from another source (e.g. Draco
          // compression extension).
          return Promise.resolve(null)
        }

        var pendingBufferViews = []

        if (accessorDef.bufferView !== undefined) {
          pendingBufferViews.push(
            this.getDependency('bufferView', accessorDef.bufferView)
          )
        } else {
          pendingBufferViews.push(null)
        }

        if (accessorDef.sparse !== undefined) {
          pendingBufferViews.push(
            this.getDependency(
              'bufferView',
              accessorDef.sparse.indices.bufferView
            )
          )
          pendingBufferViews.push(
            this.getDependency(
              'bufferView',
              accessorDef.sparse.values.bufferView
            )
          )
        }

        return Promise.all(pendingBufferViews).then(function(bufferViews) {
          var bufferView = bufferViews[0]

          var itemSize = WEBGL_TYPE_SIZES[accessorDef.type]
          var TypedArray = WEBGL_COMPONENT_TYPES[accessorDef.componentType]

          // For VEC3: itemSize is 3, elementBytes is 4, itemBytes is 12.
          var elementBytes = TypedArray.BYTES_PER_ELEMENT
          var itemBytes = elementBytes * itemSize
          var byteOffset = accessorDef.byteOffset || 0
          var byteStride =
            accessorDef.bufferView !== undefined
              ? json.bufferViews[accessorDef.bufferView].byteStride
              : undefined
          var normalized = accessorDef.normalized === true
          var array, bufferAttribute

          // The buffer is not interleaved if the stride is the item size in bytes.
          if (byteStride && byteStride !== itemBytes) {
            var ibCacheKey =
              'InterleavedBuffer:' +
              accessorDef.bufferView +
              ':' +
              accessorDef.componentType
            var ib = parser.cache.get(ibCacheKey)

            if (!ib) {
              // Use the full buffer if it's interleaved.
              array = new TypedArray(bufferView)

              // Integer parameters to IB/IBA are in array elements, not bytes.
              ib = new THREE.InterleavedBuffer(array, byteStride / elementBytes)

              parser.cache.add(ibCacheKey, ib)
            }

            bufferAttribute = new THREE.InterleavedBufferAttribute(
              ib,
              itemSize,
              byteOffset / elementBytes,
              normalized
            )
          } else {
            if (bufferView === null) {
              array = new TypedArray(accessorDef.count * itemSize)
            } else {
              array = new TypedArray(
                bufferView,
                byteOffset,
                accessorDef.count * itemSize
              )
            }

            bufferAttribute = new THREE.BufferAttribute(
              array,
              itemSize,
              normalized
            )
          }

          // https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#sparse-accessors
          if (accessorDef.sparse !== undefined) {
            var itemSizeIndices = WEBGL_TYPE_SIZES.SCALAR
            var TypedArrayIndices =
              WEBGL_COMPONENT_TYPES[accessorDef.sparse.indices.componentType]

            var byteOffsetIndices = accessorDef.sparse.indices.byteOffset || 0
            var byteOffsetValues = accessorDef.sparse.values.byteOffset || 0

            var sparseIndices = new TypedArrayIndices(
              bufferViews[1],
              byteOffsetIndices,
              accessorDef.sparse.count * itemSizeIndices
            )
            var sparseValues = new TypedArray(
              bufferViews[2],
              byteOffsetValues,
              accessorDef.sparse.count * itemSize
            )

            if (bufferView !== null) {
              // Avoid modifying the original ArrayBuffer, if the bufferView wasn't initialized with zeroes.
              bufferAttribute.setArray(bufferAttribute.array.slice())
            }

            for (var i = 0, il = sparseIndices.length; i < il; i++) {
              var index = sparseIndices[i]

              bufferAttribute.setX(index, sparseValues[i * itemSize])
              if (itemSize >= 2)
                bufferAttribute.setY(index, sparseValues[i * itemSize + 1])
              if (itemSize >= 3)
                bufferAttribute.setZ(index, sparseValues[i * itemSize + 2])
              if (itemSize >= 4)
                bufferAttribute.setW(index, sparseValues[i * itemSize + 3])
              if (itemSize >= 5)
                throw new Error(
                  'THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.'
                )
            }
          }

          return bufferAttribute
        })
      }

      /**
       * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#textures
       * @param {number} textureIndex
       * @return {Promise<THREE.Texture>}
       */
      GLTFParser.prototype.loadTexture = function(textureIndex) {
        var parser = this
        var json = this.json
        var options = this.options
        var textureLoader = this.textureLoader

        var URL = window.URL || window.webkitURL

        var textureDef = json.textures[textureIndex]

        var textureExtensions = textureDef.extensions || {}

        var source

        if (textureExtensions[EXTENSIONS.MSFT_TEXTURE_DDS]) {
          source =
            json.images[textureExtensions[EXTENSIONS.MSFT_TEXTURE_DDS].source]
        } else {
          source = json.images[textureDef.source]
        }

        var sourceURI = source.uri
        var isObjectURL = false

        if (source.bufferView !== undefined) {
          // Load binary image data from bufferView, if provided.

          sourceURI = parser
            .getDependency('bufferView', source.bufferView)
            .then(function(bufferView) {
              isObjectURL = true
              var blob = new Blob([bufferView], { type: source.mimeType })
              sourceURI = URL.createObjectURL(blob)
              return sourceURI
            })
        }

        return Promise.resolve(sourceURI)
          .then(function(sourceURI) {
            // Load Texture resource.

            var loader = THREE.Loader.Handlers.get(sourceURI)

            if (!loader) {
              loader = textureExtensions[EXTENSIONS.MSFT_TEXTURE_DDS]
                ? parser.extensions[EXTENSIONS.MSFT_TEXTURE_DDS].ddsLoader
                : textureLoader
            }

            return new Promise(function(resolve, reject) {
              loader.load(
                resolveURL(sourceURI, options.path),
                resolve,
                undefined,
                reject
              )
            })
          })
          .then(function(texture) {
            // Clean up resources and configure Texture.

            if (isObjectURL === true) {
              URL.revokeObjectURL(sourceURI)
            }

            texture.flipY = false

            if (textureDef.name !== undefined) texture.name = textureDef.name

            // Ignore unknown mime types, like DDS files.
            if (source.mimeType in MIME_TYPE_FORMATS) {
              texture.format = MIME_TYPE_FORMATS[source.mimeType]
            }

            var samplers = json.samplers || {}
            var sampler = samplers[textureDef.sampler] || {}

            texture.magFilter =
              WEBGL_FILTERS[sampler.magFilter] || THREE.LinearFilter
            texture.minFilter =
              WEBGL_FILTERS[sampler.minFilter] || THREE.LinearMipMapLinearFilter
            texture.wrapS =
              WEBGL_WRAPPINGS[sampler.wrapS] || THREE.RepeatWrapping
            texture.wrapT =
              WEBGL_WRAPPINGS[sampler.wrapT] || THREE.RepeatWrapping

            return texture
          })
      }

      /**
       * Asynchronously assigns a texture to the given material parameters.
       * @param {Object} materialParams
       * @param {string} mapName
       * @param {Object} mapDef
       * @return {Promise}
       */
      GLTFParser.prototype.assignTexture = function(
        materialParams,
        mapName,
        mapDef
      ) {
        var parser = this

        return this.getDependency('texture', mapDef.index).then(function(
          texture
        ) {
          if (!texture.isCompressedTexture) {
            switch (mapName) {
              case 'aoMap':
              case 'emissiveMap':
              case 'metalnessMap':
              case 'normalMap':
              case 'roughnessMap':
                texture.format = THREE.RGBFormat
                break
            }
          }

          if (parser.extensions[EXTENSIONS.KHR_TEXTURE_TRANSFORM]) {
            var transform =
              mapDef.extensions !== undefined
                ? mapDef.extensions[EXTENSIONS.KHR_TEXTURE_TRANSFORM]
                : undefined

            if (transform) {
              texture = parser.extensions[
                EXTENSIONS.KHR_TEXTURE_TRANSFORM
              ].extendTexture(texture, transform)
            }
          }

          materialParams[mapName] = texture
        })
      }

      /**
       * Assigns final material to a Mesh, Line, or Points instance. The instance
       * already has a material (generated from the glTF material options alone)
       * but reuse of the same glTF material may require multiple threejs materials
       * to accomodate different primitive types, defines, etc. New materials will
       * be created if necessary, and reused from a cache.
       * @param  {THREE.Object3D} mesh Mesh, Line, or Points instance.
       */
      GLTFParser.prototype.assignFinalMaterial = function(mesh) {
        var geometry = mesh.geometry
        var material = mesh.material
        var extensions = this.extensions

        var useVertexTangents = geometry.attributes.tangent !== undefined
        var useVertexColors = geometry.attributes.color !== undefined
        var useFlatShading = geometry.attributes.normal === undefined
        var useSkinning = mesh.isSkinnedMesh === true
        var useMorphTargets = Object.keys(geometry.morphAttributes).length > 0
        var useMorphNormals =
          useMorphTargets && geometry.morphAttributes.normal !== undefined

        if (mesh.isPoints) {
          var cacheKey = 'PointsMaterial:' + material.uuid

          var pointsMaterial = this.cache.get(cacheKey)

          if (!pointsMaterial) {
            pointsMaterial = new THREE.PointsMaterial()
            THREE.Material.prototype.copy.call(pointsMaterial, material)
            pointsMaterial.color.copy(material.color)
            pointsMaterial.map = material.map
            pointsMaterial.lights = false // PointsMaterial doesn't support lights yet

            this.cache.add(cacheKey, pointsMaterial)
          }

          material = pointsMaterial
        } else if (mesh.isLine) {
          var cacheKey = 'LineBasicMaterial:' + material.uuid

          var lineMaterial = this.cache.get(cacheKey)

          if (!lineMaterial) {
            lineMaterial = new THREE.LineBasicMaterial()
            THREE.Material.prototype.copy.call(lineMaterial, material)
            lineMaterial.color.copy(material.color)
            lineMaterial.lights = false // LineBasicMaterial doesn't support lights yet

            this.cache.add(cacheKey, lineMaterial)
          }

          material = lineMaterial
        }

        // Clone the material if it will be modified
        if (
          useVertexTangents ||
          useVertexColors ||
          useFlatShading ||
          useSkinning ||
          useMorphTargets
        ) {
          var cacheKey = 'ClonedMaterial:' + material.uuid + ':'

          if (material.isGLTFSpecularGlossinessMaterial)
            cacheKey += 'specular-glossiness:'
          if (useSkinning) cacheKey += 'skinning:'
          if (useVertexTangents) cacheKey += 'vertex-tangents:'
          if (useVertexColors) cacheKey += 'vertex-colors:'
          if (useFlatShading) cacheKey += 'flat-shading:'
          if (useMorphTargets) cacheKey += 'morph-targets:'
          if (useMorphNormals) cacheKey += 'morph-normals:'

          var cachedMaterial = this.cache.get(cacheKey)

          if (!cachedMaterial) {
            cachedMaterial = material.isGLTFSpecularGlossinessMaterial
              ? extensions[
                  EXTENSIONS.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS
                ].cloneMaterial(material)
              : material.clone()

            if (useSkinning) cachedMaterial.skinning = true
            if (useVertexTangents) cachedMaterial.vertexTangents = true
            if (useVertexColors)
              cachedMaterial.vertexColors = THREE.VertexColors
            if (useFlatShading) cachedMaterial.flatShading = true
            if (useMorphTargets) cachedMaterial.morphTargets = true
            if (useMorphNormals) cachedMaterial.morphNormals = true

            this.cache.add(cacheKey, cachedMaterial)
          }

          material = cachedMaterial
        }

        // workarounds for mesh and geometry

        if (
          material.aoMap &&
          geometry.attributes.uv2 === undefined &&
          geometry.attributes.uv !== undefined
        ) {
          console.log('THREE.GLTFLoader: Duplicating UVs to support aoMap.')
          geometry.addAttribute(
            'uv2',
            new THREE.BufferAttribute(geometry.attributes.uv.array, 2)
          )
        }

        if (material.isGLTFSpecularGlossinessMaterial) {
          // for GLTFSpecularGlossinessMaterial(ShaderMaterial) uniforms runtime update
          mesh.onBeforeRender =
            extensions[
              EXTENSIONS.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS
            ].refreshUniforms
        }

        mesh.material = material
      }

      /**
       * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#materials
       * @param {number} materialIndex
       * @return {Promise<THREE.Material>}
       */
      GLTFParser.prototype.loadMaterial = function(materialIndex) {
        var parser = this
        var json = this.json
        var extensions = this.extensions
        var materialDef = json.materials[materialIndex]

        var materialType
        var materialParams = {}
        var materialExtensions = materialDef.extensions || {}

        var pending = []

        if (
          materialExtensions[EXTENSIONS.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS]
        ) {
          var sgExtension =
            extensions[EXTENSIONS.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS]
          materialType = sgExtension.getMaterialType()
          pending.push(
            sgExtension.extendParams(materialParams, materialDef, parser)
          )
        } else if (materialExtensions[EXTENSIONS.KHR_MATERIALS_UNLIT]) {
          var kmuExtension = extensions[EXTENSIONS.KHR_MATERIALS_UNLIT]
          materialType = kmuExtension.getMaterialType()
          pending.push(
            kmuExtension.extendParams(materialParams, materialDef, parser)
          )
        } else {
          // Specification:
          // https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#metallic-roughness-material

          materialType = THREE.MeshStandardMaterial

          var metallicRoughness = materialDef.pbrMetallicRoughness || {}

          materialParams.color = new THREE.Color(1.0, 1.0, 1.0)
          materialParams.opacity = 1.0

          if (Array.isArray(metallicRoughness.baseColorFactor)) {
            var array = metallicRoughness.baseColorFactor

            materialParams.color.fromArray(array)
            materialParams.opacity = array[3]
          }

          if (metallicRoughness.baseColorTexture !== undefined) {
            pending.push(
              parser.assignTexture(
                materialParams,
                'map',
                metallicRoughness.baseColorTexture
              )
            )
          }

          materialParams.metalness =
            metallicRoughness.metallicFactor !== undefined
              ? metallicRoughness.metallicFactor
              : 1.0
          materialParams.roughness =
            metallicRoughness.roughnessFactor !== undefined
              ? metallicRoughness.roughnessFactor
              : 1.0

          if (metallicRoughness.metallicRoughnessTexture !== undefined) {
            pending.push(
              parser.assignTexture(
                materialParams,
                'metalnessMap',
                metallicRoughness.metallicRoughnessTexture
              )
            )
            pending.push(
              parser.assignTexture(
                materialParams,
                'roughnessMap',
                metallicRoughness.metallicRoughnessTexture
              )
            )
          }
        }

        if (materialDef.doubleSided === true) {
          materialParams.side = THREE.DoubleSide
        }

        var alphaMode = materialDef.alphaMode || ALPHA_MODES.OPAQUE

        if (alphaMode === ALPHA_MODES.BLEND) {
          materialParams.transparent = true
        } else {
          materialParams.transparent = false

          if (alphaMode === ALPHA_MODES.MASK) {
            materialParams.alphaTest =
              materialDef.alphaCutoff !== undefined
                ? materialDef.alphaCutoff
                : 0.5
          }
        }

        if (
          materialDef.normalTexture !== undefined &&
          materialType !== THREE.MeshBasicMaterial
        ) {
          pending.push(
            parser.assignTexture(
              materialParams,
              'normalMap',
              materialDef.normalTexture
            )
          )

          materialParams.normalScale = new THREE.Vector2(1, 1)

          if (materialDef.normalTexture.scale !== undefined) {
            materialParams.normalScale.set(
              materialDef.normalTexture.scale,
              materialDef.normalTexture.scale
            )
          }
        }

        if (
          materialDef.occlusionTexture !== undefined &&
          materialType !== THREE.MeshBasicMaterial
        ) {
          pending.push(
            parser.assignTexture(
              materialParams,
              'aoMap',
              materialDef.occlusionTexture
            )
          )

          if (materialDef.occlusionTexture.strength !== undefined) {
            materialParams.aoMapIntensity =
              materialDef.occlusionTexture.strength
          }
        }

        if (
          materialDef.emissiveFactor !== undefined &&
          materialType !== THREE.MeshBasicMaterial
        ) {
          materialParams.emissive = new THREE.Color().fromArray(
            materialDef.emissiveFactor
          )
        }

        if (
          materialDef.emissiveTexture !== undefined &&
          materialType !== THREE.MeshBasicMaterial
        ) {
          pending.push(
            parser.assignTexture(
              materialParams,
              'emissiveMap',
              materialDef.emissiveTexture
            )
          )
        }

        return Promise.all(pending).then(function() {
          var material

          if (materialType === THREE.ShaderMaterial) {
            material = extensions[
              EXTENSIONS.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS
            ].createMaterial(materialParams)
          } else {
            material = new materialType(materialParams)
          }

          if (materialDef.name !== undefined) material.name = materialDef.name

          // baseColorTexture, emissiveTexture, and specularGlossinessTexture use sRGB encoding.
          if (material.map) material.map.encoding = THREE.sRGBEncoding
          if (material.emissiveMap)
            material.emissiveMap.encoding = THREE.sRGBEncoding
          if (material.specularMap)
            material.specularMap.encoding = THREE.sRGBEncoding

          assignExtrasToUserData(material, materialDef)

          if (materialDef.extensions)
            addUnknownExtensionsToUserData(extensions, material, materialDef)

          return material
        })
      }

      /**
       * @param {THREE.BufferGeometry} geometry
       * @param {GLTF.Primitive} primitiveDef
       * @param {GLTFParser} parser
       * @return {Promise<THREE.BufferGeometry>}
       */
      function addPrimitiveAttributes(geometry, primitiveDef, parser) {
        var attributes = primitiveDef.attributes

        var pending = []

        function assignAttributeAccessor(accessorIndex, attributeName) {
          return parser
            .getDependency('accessor', accessorIndex)
            .then(function(accessor) {
              geometry.addAttribute(attributeName, accessor)
            })
        }

        for (var gltfAttributeName in attributes) {
          var threeAttributeName =
            ATTRIBUTES[gltfAttributeName] || gltfAttributeName.toLowerCase()

          // Skip attributes already provided by e.g. Draco extension.
          if (threeAttributeName in geometry.attributes) continue

          pending.push(
            assignAttributeAccessor(
              attributes[gltfAttributeName],
              threeAttributeName
            )
          )
        }

        if (primitiveDef.indices !== undefined && !geometry.index) {
          var accessor = parser
            .getDependency('accessor', primitiveDef.indices)
            .then(function(accessor) {
              geometry.setIndex(accessor)
            })

          pending.push(accessor)
        }

        assignExtrasToUserData(geometry, primitiveDef)

        return Promise.all(pending).then(function() {
          return primitiveDef.targets !== undefined
            ? addMorphTargets(geometry, primitiveDef.targets, parser)
            : geometry
        })
      }

      /**
       * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#geometry
       *
       * Creates BufferGeometries from primitives.
       *
       * @param {Array<GLTF.Primitive>} primitives
       * @return {Promise<Array<THREE.BufferGeometry>>}
       */
      GLTFParser.prototype.loadGeometries = function(primitives) {
        var parser = this
        var extensions = this.extensions
        var cache = this.primitiveCache

        function createDracoPrimitive(primitive) {
          return extensions[EXTENSIONS.KHR_DRACO_MESH_COMPRESSION]
            .decodePrimitive(primitive, parser)
            .then(function(geometry) {
              return addPrimitiveAttributes(geometry, primitive, parser)
            })
        }

        var pending = []

        for (var i = 0, il = primitives.length; i < il; i++) {
          var primitive = primitives[i]
          var cacheKey = createPrimitiveKey(primitive)

          // See if we've already created this geometry
          var cached = cache[cacheKey]

          if (cached) {
            // Use the cached geometry if it exists
            pending.push(cached.promise)
          } else {
            var geometryPromise

            if (
              primitive.extensions &&
              primitive.extensions[EXTENSIONS.KHR_DRACO_MESH_COMPRESSION]
            ) {
              // Use DRACO geometry if available
              geometryPromise = createDracoPrimitive(primitive)
            } else {
              // Otherwise create a new geometry
              geometryPromise = addPrimitiveAttributes(
                new THREE.BufferGeometry(),
                primitive,
                parser
              )
            }

            // Cache this geometry
            cache[cacheKey] = {
              primitive: primitive,
              promise: geometryPromise
            }

            pending.push(geometryPromise)
          }
        }

        return Promise.all(pending)
      }

      /**
       * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#meshes
       * @param {number} meshIndex
       * @return {Promise<THREE.Group|THREE.Mesh|THREE.SkinnedMesh>}
       */
      GLTFParser.prototype.loadMesh = function(meshIndex) {
        var parser = this
        var json = this.json
        var extensions = this.extensions

        var meshDef = json.meshes[meshIndex]
        var primitives = meshDef.primitives

        var pending = []

        for (var i = 0, il = primitives.length; i < il; i++) {
          var material =
            primitives[i].material === undefined
              ? createDefaultMaterial()
              : this.getDependency('material', primitives[i].material)

          pending.push(material)
        }

        return Promise.all(pending).then(function(originalMaterials) {
          return parser.loadGeometries(primitives).then(function(geometries) {
            var meshes = []

            for (var i = 0, il = geometries.length; i < il; i++) {
              var geometry = geometries[i]
              var primitive = primitives[i]

              // 1. create Mesh

              var mesh

              var material = originalMaterials[i]

              if (
                primitive.mode === WEBGL_CONSTANTS.TRIANGLES ||
                primitive.mode === WEBGL_CONSTANTS.TRIANGLE_STRIP ||
                primitive.mode === WEBGL_CONSTANTS.TRIANGLE_FAN ||
                primitive.mode === undefined
              ) {
                // .isSkinnedMesh isn't in glTF spec. See .markDefs()
                mesh =
                  meshDef.isSkinnedMesh === true
                    ? new THREE.SkinnedMesh(geometry, material)
                    : new THREE.Mesh(geometry, material)

                if (mesh.isSkinnedMesh === true) mesh.normalizeSkinWeights() // #15319

                if (primitive.mode === WEBGL_CONSTANTS.TRIANGLE_STRIP) {
                  mesh.drawMode = THREE.TriangleStripDrawMode
                } else if (primitive.mode === WEBGL_CONSTANTS.TRIANGLE_FAN) {
                  mesh.drawMode = THREE.TriangleFanDrawMode
                }
              } else if (primitive.mode === WEBGL_CONSTANTS.LINES) {
                mesh = new THREE.LineSegments(geometry, material)
              } else if (primitive.mode === WEBGL_CONSTANTS.LINE_STRIP) {
                mesh = new THREE.Line(geometry, material)
              } else if (primitive.mode === WEBGL_CONSTANTS.LINE_LOOP) {
                mesh = new THREE.LineLoop(geometry, material)
              } else if (primitive.mode === WEBGL_CONSTANTS.POINTS) {
                mesh = new THREE.Points(geometry, material)
              } else {
                throw new Error(
                  'THREE.GLTFLoader: Primitive mode unsupported: ' +
                    primitive.mode
                )
              }

              if (Object.keys(mesh.geometry.morphAttributes).length > 0) {
                updateMorphTargets(mesh, meshDef)
              }

              mesh.name = meshDef.name || 'mesh_' + meshIndex

              if (geometries.length > 1) mesh.name += '_' + i

              assignExtrasToUserData(mesh, meshDef)

              parser.assignFinalMaterial(mesh)

              meshes.push(mesh)
            }

            if (meshes.length === 1) {
              return meshes[0]
            }

            var group = new THREE.Group()

            for (var i = 0, il = meshes.length; i < il; i++) {
              group.add(meshes[i])
            }

            return group
          })
        })
      }

      /**
       * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#cameras
       * @param {number} cameraIndex
       * @return {Promise<THREE.Camera>}
       */
      GLTFParser.prototype.loadCamera = function(cameraIndex) {
        var camera
        var cameraDef = this.json.cameras[cameraIndex]
        var params = cameraDef[cameraDef.type]

        if (!params) {
          console.warn('THREE.GLTFLoader: Missing camera parameters.')
          return
        }

        if (cameraDef.type === 'perspective') {
          camera = new THREE.PerspectiveCamera(
            THREE.Math.radToDeg(params.yfov),
            params.aspectRatio || 1,
            params.znear || 1,
            params.zfar || 2e6
          )
        } else if (cameraDef.type === 'orthographic') {
          camera = new THREE.OrthographicCamera(
            params.xmag / -2,
            params.xmag / 2,
            params.ymag / 2,
            params.ymag / -2,
            params.znear,
            params.zfar
          )
        }

        if (cameraDef.name !== undefined) camera.name = cameraDef.name

        assignExtrasToUserData(camera, cameraDef)

        return Promise.resolve(camera)
      }

      /**
       * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#skins
       * @param {number} skinIndex
       * @return {Promise<Object>}
       */
      GLTFParser.prototype.loadSkin = function(skinIndex) {
        var skinDef = this.json.skins[skinIndex]

        var skinEntry = { joints: skinDef.joints }

        if (skinDef.inverseBindMatrices === undefined) {
          return Promise.resolve(skinEntry)
        }

        return this.getDependency('accessor', skinDef.inverseBindMatrices).then(
          function(accessor) {
            skinEntry.inverseBindMatrices = accessor

            return skinEntry
          }
        )
      }

      /**
       * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#animations
       * @param {number} animationIndex
       * @return {Promise<THREE.AnimationClip>}
       */
      GLTFParser.prototype.loadAnimation = function(animationIndex) {
        var json = this.json

        var animationDef = json.animations[animationIndex]

        var pendingNodes = []
        var pendingInputAccessors = []
        var pendingOutputAccessors = []
        var pendingSamplers = []
        var pendingTargets = []

        for (var i = 0, il = animationDef.channels.length; i < il; i++) {
          var channel = animationDef.channels[i]
          var sampler = animationDef.samplers[channel.sampler]
          var target = channel.target
          var name = target.node !== undefined ? target.node : target.id // NOTE: target.id is deprecated.
          var input =
            animationDef.parameters !== undefined
              ? animationDef.parameters[sampler.input]
              : sampler.input
          var output =
            animationDef.parameters !== undefined
              ? animationDef.parameters[sampler.output]
              : sampler.output

          pendingNodes.push(this.getDependency('node', name))
          pendingInputAccessors.push(this.getDependency('accessor', input))
          pendingOutputAccessors.push(this.getDependency('accessor', output))
          pendingSamplers.push(sampler)
          pendingTargets.push(target)
        }

        return Promise.all([
          Promise.all(pendingNodes),
          Promise.all(pendingInputAccessors),
          Promise.all(pendingOutputAccessors),
          Promise.all(pendingSamplers),
          Promise.all(pendingTargets)
        ]).then(function(dependencies) {
          var nodes = dependencies[0]
          var inputAccessors = dependencies[1]
          var outputAccessors = dependencies[2]
          var samplers = dependencies[3]
          var targets = dependencies[4]

          var tracks = []

          for (var i = 0, il = nodes.length; i < il; i++) {
            var node = nodes[i]
            var inputAccessor = inputAccessors[i]
            var outputAccessor = outputAccessors[i]
            var sampler = samplers[i]
            var target = targets[i]

            if (node === undefined) continue

            node.updateMatrix()
            node.matrixAutoUpdate = true

            var TypedKeyframeTrack

            switch (PATH_PROPERTIES[target.path]) {
              case PATH_PROPERTIES.weights:
                TypedKeyframeTrack = THREE.NumberKeyframeTrack
                break

              case PATH_PROPERTIES.rotation:
                TypedKeyframeTrack = THREE.QuaternionKeyframeTrack
                break

              case PATH_PROPERTIES.position:
              case PATH_PROPERTIES.scale:
              default:
                TypedKeyframeTrack = THREE.VectorKeyframeTrack
                break
            }

            var targetName = node.name ? node.name : node.uuid

            var interpolation =
              sampler.interpolation !== undefined
                ? INTERPOLATION[sampler.interpolation]
                : THREE.InterpolateLinear

            var targetNames = []

            if (PATH_PROPERTIES[target.path] === PATH_PROPERTIES.weights) {
              // Node may be a THREE.Group (glTF mesh with several primitives) or a THREE.Mesh.
              node.traverse(function(object) {
                if (object.isMesh === true && object.morphTargetInfluences) {
                  targetNames.push(object.name ? object.name : object.uuid)
                }
              })
            } else {
              targetNames.push(targetName)
            }

            for (var j = 0, jl = targetNames.length; j < jl; j++) {
              var track = new TypedKeyframeTrack(
                targetNames[j] + '.' + PATH_PROPERTIES[target.path],
                inputAccessor.array,
                outputAccessor.array,
                interpolation
              )

              // Override interpolation with custom factory method.
              if (sampler.interpolation === 'CUBICSPLINE') {
                track.createInterpolant = function InterpolantFactoryMethodGLTFCubicSpline(
                  result
                ) {
                  // A CUBICSPLINE keyframe in glTF has three output values for each input value,
                  // representing inTangent, splineVertex, and outTangent. As a result, track.getValueSize()
                  // must be divided by three to get the interpolant's sampleSize argument.

                  return new GLTFCubicSplineInterpolant(
                    this.times,
                    this.values,
                    this.getValueSize() / 3,
                    result
                  )
                }

                // Mark as CUBICSPLINE. `track.getInterpolation()` doesn't support custom interpolants.
                track.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline = true
              }

              tracks.push(track)
            }
          }

          var name =
            animationDef.name !== undefined
              ? animationDef.name
              : 'animation_' + animationIndex

          return new THREE.AnimationClip(name, undefined, tracks)
        })
      }

      /**
       * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#nodes-and-hierarchy
       * @param {number} nodeIndex
       * @return {Promise<THREE.Object3D>}
       */
      GLTFParser.prototype.loadNode = function(nodeIndex) {
        var json = this.json
        var extensions = this.extensions
        var parser = this

        var meshReferences = json.meshReferences
        var meshUses = json.meshUses

        var nodeDef = json.nodes[nodeIndex]

        return (function() {
          // .isBone isn't in glTF spec. See .markDefs
          if (nodeDef.isBone === true) {
            return Promise.resolve(new THREE.Bone())
          } else if (nodeDef.mesh !== undefined) {
            return parser
              .getDependency('mesh', nodeDef.mesh)
              .then(function(mesh) {
                var node

                if (meshReferences[nodeDef.mesh] > 1) {
                  var instanceNum = meshUses[nodeDef.mesh]++

                  node = mesh.clone()
                  node.name += '_instance_' + instanceNum

                  // onBeforeRender copy for Specular-Glossiness
                  node.onBeforeRender = mesh.onBeforeRender

                  for (var i = 0, il = node.children.length; i < il; i++) {
                    node.children[i].name += '_instance_' + instanceNum
                    node.children[i].onBeforeRender =
                      mesh.children[i].onBeforeRender
                  }
                } else {
                  node = mesh
                }

                // if weights are provided on the node, override weights on the mesh.
                if (nodeDef.weights !== undefined) {
                  node.traverse(function(o) {
                    if (!o.isMesh) return

                    for (var i = 0, il = nodeDef.weights.length; i < il; i++) {
                      o.morphTargetInfluences[i] = nodeDef.weights[i]
                    }
                  })
                }

                return node
              })
          } else if (nodeDef.camera !== undefined) {
            return parser.getDependency('camera', nodeDef.camera)
          } else if (
            nodeDef.extensions &&
            nodeDef.extensions[EXTENSIONS.KHR_LIGHTS_PUNCTUAL] &&
            nodeDef.extensions[EXTENSIONS.KHR_LIGHTS_PUNCTUAL].light !==
              undefined
          ) {
            return parser.getDependency(
              'light',
              nodeDef.extensions[EXTENSIONS.KHR_LIGHTS_PUNCTUAL].light
            )
          } else {
            return Promise.resolve(new THREE.Object3D())
          }
        })().then(function(node) {
          if (nodeDef.name !== undefined) {
            node.name = THREE.PropertyBinding.sanitizeNodeName(nodeDef.name)
          }

          assignExtrasToUserData(node, nodeDef)

          if (nodeDef.extensions)
            addUnknownExtensionsToUserData(extensions, node, nodeDef)

          if (nodeDef.matrix !== undefined) {
            var matrix = new THREE.Matrix4()
            matrix.fromArray(nodeDef.matrix)
            node.applyMatrix(matrix)
          } else {
            if (nodeDef.translation !== undefined) {
              node.position.fromArray(nodeDef.translation)
            }

            if (nodeDef.rotation !== undefined) {
              node.quaternion.fromArray(nodeDef.rotation)
            }

            if (nodeDef.scale !== undefined) {
              node.scale.fromArray(nodeDef.scale)
            }
          }

          return node
        })
      }

      /**
       * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#scenes
       * @param {number} sceneIndex
       * @return {Promise<THREE.Scene>}
       */
      GLTFParser.prototype.loadScene = (function() {
        // scene node hierachy builder

        function buildNodeHierachy(nodeId, parentObject, json, parser) {
          var nodeDef = json.nodes[nodeId]

          return parser
            .getDependency('node', nodeId)
            .then(function(node) {
              if (nodeDef.skin === undefined) return node

              // build skeleton here as well

              var skinEntry

              return parser
                .getDependency('skin', nodeDef.skin)
                .then(function(skin) {
                  skinEntry = skin

                  var pendingJoints = []

                  for (var i = 0, il = skinEntry.joints.length; i < il; i++) {
                    pendingJoints.push(
                      parser.getDependency('node', skinEntry.joints[i])
                    )
                  }

                  return Promise.all(pendingJoints)
                })
                .then(function(jointNodes) {
                  var meshes = node.isGroup === true ? node.children : [node]

                  for (var i = 0, il = meshes.length; i < il; i++) {
                    var mesh = meshes[i]

                    var bones = []
                    var boneInverses = []

                    for (var j = 0, jl = jointNodes.length; j < jl; j++) {
                      var jointNode = jointNodes[j]

                      if (jointNode) {
                        bones.push(jointNode)

                        var mat = new THREE.Matrix4()

                        if (skinEntry.inverseBindMatrices !== undefined) {
                          mat.fromArray(
                            skinEntry.inverseBindMatrices.array,
                            j * 16
                          )
                        }

                        boneInverses.push(mat)
                      } else {
                        console.warn(
                          'THREE.GLTFLoader: Joint "%s" could not be found.',
                          skinEntry.joints[j]
                        )
                      }
                    }

                    mesh.bind(
                      new THREE.Skeleton(bones, boneInverses),
                      mesh.matrixWorld
                    )
                  }

                  return node
                })
            })
            .then(function(node) {
              // build node hierachy

              parentObject.add(node)

              var pending = []

              if (nodeDef.children) {
                var children = nodeDef.children

                for (var i = 0, il = children.length; i < il; i++) {
                  var child = children[i]
                  pending.push(buildNodeHierachy(child, node, json, parser))
                }
              }

              return Promise.all(pending)
            })
        }

        return function loadScene(sceneIndex) {
          var json = this.json
          var extensions = this.extensions
          var sceneDef = this.json.scenes[sceneIndex]
          var parser = this

          var scene = new THREE.Scene()
          if (sceneDef.name !== undefined) scene.name = sceneDef.name

          assignExtrasToUserData(scene, sceneDef)

          if (sceneDef.extensions)
            addUnknownExtensionsToUserData(extensions, scene, sceneDef)

          var nodeIds = sceneDef.nodes || []

          var pending = []

          for (var i = 0, il = nodeIds.length; i < il; i++) {
            pending.push(buildNodeHierachy(nodeIds[i], scene, json, parser))
          }

          return Promise.all(pending).then(function() {
            return scene
          })
        }
      })()

      return GLTFLoader
    })()

    // "./thirdParty/threejs/utils/SceneUtils.js"
    // console.log('@@@@16 SceneUtils')
    /**
     * @author alteredq / http://alteredqualia.com/
     */
    THREE.SceneUtils = {
      createMultiMaterialObject: function(geometry, materials) {
        var group = new THREE.Group()

        for (var i = 0, l = materials.length; i < l; i++) {
          group.add(new THREE.Mesh(geometry, materials[i]))
        }

        return group
      },

      detach: function(child, parent, scene) {
        child.applyMatrix(parent.matrixWorld)
        parent.remove(child)
        scene.add(child)
      },

      attach: function(child, scene, parent) {
        child.applyMatrix(new THREE.Matrix4().getInverse(parent.matrixWorld))

        scene.remove(child)
        parent.add(child)
      }
    }

    // "./src/iesrender.js"
    // console.log('@@@@17 iesRender')
    !(function(t, e) {
      'object' == typeof exports && 'object' == typeof module
        ? (module.exports = e())
        : 'function' == typeof define && define.amd
        ? define([], e)
        : e()
    })(window, function() {
      /** Unit, now only include cm and m */
      const UNITS = {
        cm: 0.01,
        m: 1.0
      }

      /** app quality : affect perfomance */
      const QUALITY = {
        High: {
          fps: 60,
          resolution: 1.0,
          shadow: true
        },
        Middle: {
          fps: 30,
          resolution: 0.8,
          shadow: true
        },
        Low: {
          fps: 30,
          resolution: 0.5,
          shadow: true
        },
        VeryLow: {
          fps: 30,
          resolution: 0.5,
          shadow: false
        }
      }

      /** init Settings */
      const settings = {
        light: {
          position: new THREE.Vector3(0, 2.8, -1.4),
          rotationZ: -Math.PI * 0.5,
          intensity: 2.0,
          CCT: 6500
        },
        ambientLight: {
          intensity: 50
        },
        toneMapper: {
          toneMapping: THREE.CineonToneMapping,
          //toneMapping: THREE.ReinhardToneMapping,
          toneMappingExposure: 0.95
        },
        camera: {
          position: new THREE.Vector3(0, 2.9, 3),
          lookAtPosition: new THREE.Vector3(0, 2, 0)
        },
        system: {
          maxLights: 15,
          unit: Object.keys(UNITS)[0],
          maxLux: 1000,
          roomScale: new THREE.Vector3(5.0, 3.0, 4.0),
          quality: getQulityByCurrentDevice()
        }
      }

      var renderer = null
      var scene = null
      var camera = null

      var orbitControl = null
      var transformControl = null
      var bTranslate = false
      var bRotate = false
      var bScale = false

      var stats = null
      var gui = null
      var bEnableClick = true
      var clickTimer = null
      var objectPropertyGui = null
      var transformGui = null
      var translateGui = null
      var rotationGui = null
      var scaleGui = null
      var lightPropertiesGui = null
      var lightArrayGui = null
      var displayGui = null

      var hemiLight = new THREE.HemisphereLight(
        0xffffff,
        0x0f0e0d,
        settings.ambientLight.intensity / 309.0
      )

      var lightAnchor = new THREE.Object3D()
      var lightGeo = new THREE.CylinderBufferGeometry(0.03, 0.03, 0.09, 8)

      var lightMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true
      })
      var selectedMaterial = new THREE.MeshBasicMaterial({
        color: 0x117eff,
        transparent: true,
        opacity: 0.7
      })
      var luxMaterial = new THREE.MeshStandardMaterial({
        color: 0x4c4c4c,
        roughness: 1.0
      })

      var grids = []

      var movableObjects = []
      var lightMeshes = []

      var hoverObject = null
      var selectedObject = null

      var composer = null
      var effectLux = null
      var luxBarDiv = null

      var textureloader = new THREE.TextureLoader()
      var GLTFloader = new THREE.GLTFLoader()

      var urlPrefix = 'https://litku.oss-cn-beijing.aliyuncs.com/ies/'
      var iesLinks = __ies.iesLinks || {
        ies_24D: urlPrefix + 'ieses/24D_3.dat',
        ies_28D46D: urlPrefix + 'ieses/28D46D_3.dat',
        ies_Road_1: urlPrefix + 'ieses/Road_1_3.dat'
      }

      var scenes = {
        简易房间: 'simpleRoom'
      }

      // @@modify 追加默认值
      var options = {
        iesLinks: __ies.config.ies || Object.keys(iesLinks)[0],
        scenes: Object.keys(scenes)[0],
        objectProperties: {
          name: ''
        },
        transform: {
          location: [
            settings.light.position.x / UNITS[settings.system.unit],
            settings.light.position.y / UNITS[settings.system.unit],
            settings.light.position.z / UNITS[settings.system.unit]
          ],
          rotation: [0, 0, 0],
          scale: [1.0, 1.0, 1.0],
          reset: function() {
            // options.transform.location[0] = settings.light.position.x * units[settings.system.unit];
            // options.transform.location[1] = settings.light.position.y * units[settings.system.unit];
            // options.transform.location[2] = settings.light.position.z * units[settings.system.unit];
            // lightAnchor.position.copy(settings.light.position);
            // lightAnchor.updateMatrixWorld();
            // for (var i in gui.__folders["定位"].__controllers) {
            //     gui.__folders["定位"].__controllers[i].updateDisplay();
            // }
          }
        },
        light: {
          intensity: __ies.config.light || settings.light.intensity * 400,
          CCT: __ies.config.cct || settings.light.CCT,
          reset: function() {}
        },
        ambientLight: {
          intensity:
            __ies.config.ambientLight || settings.ambientLight.intensity
        },
        lightArray: {
          number: [1, 1],
          interval: [
            0.2 / UNITS[settings.system.unit],
            0.2 / UNITS[settings.system.unit]
          ],
          rotation: [
            // Rotation Of Single Light
            0.0,
            0.0,
            0.0
          ]
        },
        display: {
          showAssist: false,
          showLux: false,
          showContour: false,
          maxLux: settings.system.maxLux
        },
        buttons: {
          // toggleLocal: function () {
          //     if (transformControl !== null) {
          //         transformControl.setSpace(transformControl.space === "local" ? "world" : "local");
          //     }
          // },
          translate: function() {
            if (transformControl !== null) {
              transformControl.setMode('translate')
              transformControl.enabled = bTranslate
            }
          },
          rotate: function() {
            if (transformControl !== null) {
              transformControl.setMode('rotate')
              transformControl.enabled = bRotate
            }
          },
          scale: function() {
            if (transformControl !== null) {
              transformControl.setMode('scale')
              transformControl.enabled = bScale
            }
          }
        }
      }

      var staticMeshIndex = 0
      var staticMeshResources = [
        {
          name: 'wallBack',
          url: urlPrefix + 'models/SM_Wall1/SM_Wall1.gltf',
          diffuseMap: ['', ''],
          normalMap: [
            urlPrefix + 'models/SM_Wall1/SM_Wall1.fbm/tiles_028_Normal.png',
            ''
          ],
          ref: null,
          cachedMaterials: []
        },
        {
          name: 'wallLeft',
          url: urlPrefix + 'models/SM_Wall2L/SM_Wall2L.gltf',
          diffuseMap: ['', ''],
          normalMap: [
            '',
            urlPrefix + 'models/SM_Wall2L/SM_Wall2L.fbm/T_PaintedWall_N.png'
          ],
          ref: null,
          cachedMaterials: []
        },
        {
          name: 'wallRight',
          url: urlPrefix + 'models/SM_Wall2R/SM_Wall2R.gltf',
          diffuseMap: ['', ''],
          normalMap: [
            '',
            urlPrefix + 'models/SM_Wall2R/SM_Wall2R.fbm/T_PaintedWall_N.png'
          ],
          ref: null,
          cachedMaterials: []
        },
        {
          name: 'ceil',
          url: urlPrefix + 'models/SM_Ceil/SM_Ceil.gltf',
          diffuseMap: [''],
          normalMap: [
            urlPrefix + 'models/SM_Ceil/SM_Ceil.fbm/T_PaintedWall_N.png'
          ],
          ref: null,
          cachedMaterials: []
        },
        {
          name: 'floor',
          url: urlPrefix + 'models/SM_Floor/SM_Floor.gltf',
          diffuseMap: [''],
          normalMap: [
            urlPrefix +
              'models/SM_Floor/SM_Floor.fbm/wood_cherry_wood_floor_Normal.png'
          ],
          ref: null,
          cachedMaterials: []
        }
      ]

      var movableMeshIndex = 0
      var movableMeshResources = [
        {
          name: 'painter',
          label: '画作',
          url: urlPrefix + 'models/SM_huakuang/SM_huakuang_05.gltf',
          diffuseMap: ['', '', ''],
          normalMap: ['', '', ''],
          ref: null,
          cachedMaterials: [],
          initPostion: [0.32, 1.68, -2],
          initRotation: [-Math.PI * 0.5, 0, -Math.PI * 0.5],
          initScale: [1.0, 1.0, 1.0],
          boundBox: [0.0, 0.0, 0.0]
        },
        {
          name: 'table',
          label: '桌子',
          url: urlPrefix + 'models/SM_Table/SM_Table.gltf',
          diffuseMap: ['', '', ''],
          normalMap: [
            urlPrefix +
              'models/SM_Table/SM_Table.fbm/Wood_White_Cedar_normal.png',
            '',
            ''
          ],
          ref: null,
          cachedMaterials: [],
          initPostion: [0, 0, -1.4],
          initRotation: [-Math.PI * 0.5, 0, 0],
          initScale: [1.0, 1.0, 1.0],
          boundBox: [0.0, 0.0, 0.0]
        },
        {
          name: 'item',
          label: '摆件',
          url: urlPrefix + 'models/SM_Item/SM_Item.gltf',
          diffuseMap: [''],
          normalMap: [
            urlPrefix + 'models/SM_Item/SM_Item.fbm/T_Metal_Gold_N.png'
          ],
          ref: null,
          cachedMaterials: [],
          initPostion: [0, 0.75, -1.4],
          initRotation: [-Math.PI * 0.5, 0, 0],
          initScale: [1.0, 1.0, 1.0],
          boundBox: [0.0, 0.0, 0.0],
          initMaterial: {
            metalness: 1.0,
            roughness: 0.2
          }
        }
      ]

      /** Global Static Functions */
      function delayEnableClick(enable = true, time = 200) {
        cancelClickTimer()
        enableClickTimer(enable, time)
      }

      function enableClickTimer(enable, time) {
        clickTimer = setTimeout(function() {
          bEnableClick = enable
        }, time)
      }

      function cancelClickTimer() {
        if (clickTimer) {
          clearTimeout(clickTimer)
        }
      }

      // get Qulity by DeviceType
      function getQulityByCurrentDevice() {
        if (device.ipad()) {
          return QUALITY.Middle
        } else if (device.mobile()) {
          return QUALITY.Low
        } else if (device.desktop()) {
          return QUALITY.High
        } else {
          return QUALITY.VeryLow
        }
      }

      /** Convert CCT to Color
       * reference - UE4 - Color.cpp
       */
      function makeColorFromTemperature(Temp) {
        Temp = Math.min(Math.max(Temp, 1000.0), 15000.0)

        // Approximate Planckian locus in CIE 1960 UCS
        var u =
          (0.860117757 + 1.54118254e-4 * Temp + 1.28641212e-7 * Temp * Temp) /
          (1.0 + 8.42420235e-4 * Temp + 7.08145163e-7 * Temp * Temp)
        var v =
          (0.317398726 + 4.22806245e-5 * Temp + 4.20481691e-8 * Temp * Temp) /
          (1.0 - 2.89741816e-5 * Temp + 1.61456053e-7 * Temp * Temp)

        var x = (3.0 * u) / (2.0 * u - 8.0 * v + 4.0)
        var y = (2.0 * v) / (2.0 * u - 8.0 * v + 4.0)
        var z = 1.0 - x - y

        var Y = 1.0
        var X = (Y / y) * x
        var Z = (Y / y) * z

        // XYZ to RGB with BT.709 primaries
        var R = 3.2404542 * X + -1.5371385 * Y + -0.4985314 * Z
        var G = -0.969266 * X + 1.8760108 * Y + 0.041556 * Z
        var B = 0.0556434 * X + -0.2040259 * Y + 1.0572252 * Z

        var gamma = 1.0 / 2.0
        R = Math.pow(R, gamma)
        G = Math.pow(G, gamma)
        B = Math.pow(B, gamma)

        // R = Math.pow(R, gamma);
        // G = Math.pow(G, gamma);
        // B = Math.pow(B, gamma);
        return new THREE.Color(R, G, B)
      }

      /** Add Controls */
      function initControls() {
        // Add Orbit Control
        // @ Use Some Tricks(200ms lag) To Prevent MouseDown Event Confilcts
        orbitControl = new THREE.OrbitControls(camera, renderer.domElement)
        orbitControl.target = settings.camera.lookAtPosition
        camera.lookAt(orbitControl.target)
        orbitControl.addEventListener('start', function(event) {
          delayEnableClick(false)
        })

        orbitControl.addEventListener('end', function(event, mode) {
          delayEnableClick()
        })

        // Add Transform Control
        transformControl = new THREE.TransformControls(
          camera,
          renderer.domElement
        )
        transformControl.addEventListener('dragging-changed', function(event) {
          orbitControl.enabled = !event.value
        })

        transformControl.addEventListener('change', function(event) {
          if (!bEnableClick) {
            // update Data
            updateTransformGUI()
          }
        })

        // Keyboard Listener
        window.addEventListener('keydown', function(event) {
          switch (event.keyCode) {
            case 66: // B - World/Local
              transformControl.setSpace(
                transformControl.space === 'local' ? 'world' : 'local'
              )
              break
            case 90: // Z - Translation
              transformControl.setMode('translate')
              transformControl.enabled = bTranslate
              break
            case 88: // X - Rotation
              transformControl.setMode('rotate')
              transformControl.enabled = bRotate
              break
            case 67: // C -Scale
              transformControl.setMode('scale')
              transformControl.enabled = bScale
              break
            case 32: // Spacebar - enable control
              transformControl.enabled = !transformControl.enabled
              break
          }
        })

        renderer.domElement.addEventListener('touchend', function(event) {
          event.preventDefault()
          event = event.changedTouches[0] // important

          handleTraceObject(event)
        })

        renderer.domElement.addEventListener('click', function(event) {
          event.preventDefault()

          handleTraceObject(event)
        })
      }

      var mousePosition = new THREE.Vector2()
      var worldPosition = new THREE.Vector3()
      var plane = new THREE.Plane()
      var intersection = new THREE.Vector3()
      var offset = new THREE.Vector3()
      var inverseMatrix = new THREE.Matrix4()
      var rayCaster = new THREE.Raycaster()

      function handleTraceObject(event) {
        if (!bEnableClick) {
          return
        }
        var rect = renderer.domElement.getBoundingClientRect()
        mousePosition.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
        mousePosition.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
        rayCaster.setFromCamera(mousePosition, camera)

        var intersects = rayCaster.intersectObjects(movableObjects)
        if (selectedObject) {
          for (let i in lightAnchor.children) {
            lightAnchor.children[i].material = lightMaterial
            lightAnchor.children[i].children[1].visible = false
          }
          if (options.display.showLux || options.display.showContour) {
            updateMovableMeshesMaterial(false)
          } else {
            updateMovableMeshesMaterial(true)
          }
          showMovableOutline(false)
        }

        if (intersects.length > 0) {
          if (lightMeshes.indexOf(intersects[0].object) > -1) {
            if (selectedObject === lightAnchor) {
              selectedObject = intersects[0].object
              selectedObject.material = selectedMaterial
              selectedObject.children[1].visible = true
            } else if (
              selectedObject === intersects[0].object ||
              lightMeshes.indexOf(selectedObject) < 0
            ) {
              selectedObject = lightAnchor
              for (let i in lightAnchor.children) {
                lightAnchor.children[i].material = selectedMaterial
                lightAnchor.children[i].children[1].visible = true
              }
            } else {
              selectedObject = intersects[0].object
              selectedObject.material = selectedMaterial
              selectedObject.children[1].visible = true
            }
          } else if (intersects[0].object.parent !== scene) {
            selectedObject = intersects[0].object.parent
            for (let childIndex in selectedObject.children) {
              selectedObject.children[childIndex].material = selectedMaterial
              selectedObject.children[childIndex].children[0].visible = true
            }
          } else {
            selectedObject = intersects[0].object
            selectedObject.material = selectedMaterial
            selectedObject.children[0].visible = true
          }

          if (rayCaster.ray.intersectPlane(plane, intersection)) {
            inverseMatrix.getInverse(selectedObject.parent.matrixWorld)
            offset
              .copy(intersection)
              .sub(
                worldPosition.setFromMatrixPosition(selectedObject.matrixWorld)
              )
          }

          transformControl.attach(selectedObject)
          updateTransformGUI()
          updateLightGUI()
        } else {
          selectedObject = null
          transformControl.detach(transformControl.object)
        }
        showTransformGUI()
        showLightGUI()
        showObjectPropertyGUI()
      }

      var newLocation = new THREE.Vector3()
      var newQuaternion = new THREE.Quaternion()
      var newRotation = new THREE.Euler()
      var newScale = new THREE.Vector3()

      function updateTransformGUI() {
        // update Data
        if (transformControl.object !== undefined) {
          transformControl.object.getWorldPosition(newLocation)
          options.transform.location[0] =
            newLocation.x / UNITS[settings.system.unit]
          options.transform.location[1] =
            newLocation.y / UNITS[settings.system.unit]
          options.transform.location[2] =
            newLocation.z / UNITS[settings.system.unit]

          transformControl.object.getWorldQuaternion(newQuaternion)
          newRotation.setFromQuaternion(newQuaternion)
          options.transform.rotation[0] = (newRotation.x / Math.PI) * 180
          options.transform.rotation[1] = (newRotation.y / Math.PI) * 180
          options.transform.rotation[2] = (newRotation.z / Math.PI) * 180

          if (transformControl.object.hasOwnProperty('boxBoundSize')) {
            transformControl.object.getWorldScale(newScale)
            options.transform.scale[0] =
              newScale.x * transformControl.object.boxBoundSize[0] * 100
            options.transform.scale[1] =
              newScale.y * transformControl.object.boxBoundSize[2] * 100
            options.transform.scale[2] =
              newScale.z * transformControl.object.boxBoundSize[1] * 100
          }

          // Update UI
          if (transformControl.object === lightAnchor) {
            gui.__folders['阵列'].__controllers[2].updateDisplay()
            for (let i in gui.__folders['阵列'].__folders['旋转']
              .__controllers) {
              gui.__folders['阵列'].__folders['旋转'].__controllers[
                i
              ].updateDisplay()
            }
          } else {
            for (let i in gui.__folders['定位'].__controllers) {
              gui.__folders['定位'].__controllers[i].updateDisplay()
            }
          }
        }
      }

      function updateLightGUI() {
        if (transformControl.object === lightAnchor) {
          let sameIntensity = lightMeshes.every(function(item, index, array) {
            return (
              item.children[0].intensity ===
              lightMeshes[0].children[0].intensity
            )
          })
          let sameCCT = lightMeshes.every(function(item, index, array) {
            return item.children[0].CCT === lightMeshes[0].children[0].CCT
          })

          if (sameIntensity) {
            options.light.intensity = lightMeshes[0].children[0].intensity * 400
          } else {
            options.light.intensity = 'multi-value'
          }

          if (sameCCT) {
            options.light.CCT = lightMeshes[0].children[0].CCT
          } else {
            options.light.CCT = 'multi-value'
          }
        } else if (lightMeshes.indexOf(transformControl.object) > -1) {
          options.light.intensity =
            transformControl.object.children[0].intensity * 400
          options.light.CCT = transformControl.object.children[0].CCT
        }
        for (let i in gui.__folders['光学数据'].__controllers) {
          gui.__folders['光学数据'].__controllers[i].updateDisplay()
        }
      }

      function showTransformGUI() {
        if (transformControl.object !== undefined) {
          if (
            movableObjects.indexOf(transformControl.object) > -1 ||
            transformControl.object instanceof THREE.Group
          ) {
            bTranslate = true
            bRotate = true
            bScale = true
          }
          if (
            transformControl.object === lightAnchor ||
            lightMeshes.indexOf(transformControl.object) > -1
          ) {
            bTranslate = true
            bRotate = true
            bScale = false
          }
          if (!bTranslate && !bRotate && !bScale) {
            transformGui.hide()
          } else if (transformControl.object === lightAnchor) {
            transformGui.hide()
          } else {
            transformGui.show()
          }
          if (bTranslate) {
            translateGui.show()
          } else {
            translateGui.hide()
          }
          if (bRotate) {
            rotationGui.show()
          } else {
            rotationGui.hide()
          }
          if (bScale) {
            scaleGui.show()
          } else {
            scaleGui.hide()
          }

          if ((transformControl.getMode() === 'translate') | 'rotate') {
            transformControl.enabled = true
          } else if (transformControl.getMode() === 'scale') {
            transformControl.enabled = bScale
          }
        } else {
          transformGui.hide()
        }
      }

      function showLightGUI() {
        lightPropertiesGui.hide()
        lightArrayGui.hide()
        if (transformControl.object !== undefined) {
          if (transformControl.object === lightAnchor) {
            lightPropertiesGui.show()
            lightArrayGui.show()
          }
          if (lightMeshes.indexOf(transformControl.object) > -1) {
            lightPropertiesGui.show()
          }
        }
      }

      function showObjectPropertyGUI() {
        objectPropertyGui.hide()
        if (transformControl.object !== undefined) {
          objectPropertyGui.show()
          options.objectProperties.name = selectedObject.name
        } else {
          options.objectProperties.name = ''
        }
        for (let i in gui.__folders['属性'].__controllers) {
          gui.__folders['属性'].__controllers[i].updateDisplay()
        }
      }

      /** Create Render */
      function initRenderer() {
        if (WEBGL.isWebGLAvailable() === false) {
          document.body.appendChild(WEBGL.getWebGLErrorMessage())
          return false
        }

        renderer = new THREE.WebGLRenderer({ antialias: true })

        // @@modify
        __ies.renderer = renderer

        renderer.setPixelRatio(
          window.devicePixelRatio * settings.system.quality.resolution
        )
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.autoClear = false

        // @@modify
        // document.body.appendChild(renderer.domElement);
        if (__ies.target) {
          __ies.target.appendChild(renderer.domElement)
        } else {
          document.body.appendChild(renderer.domElement)
        }

        // Add ToneMapper
        renderer.gammaOutput = true
        renderer.gammaInput = true
        renderer.toneMapping = settings.toneMapper.toneMapping
        renderer.toneMappingExposure = Math.pow(
          settings.toneMapper.toneMappingExposure,
          5.0
        )
        //renderer.toneMappingExposure = 1.0;

        // Set To Physically Correct - Inversed Sqrt Distance
        renderer.physicallyCorrectLights = true

        // Window Resize
        window.addEventListener('resize', onWindowResize, false)

        // Use Shadow Map
        renderer.shadowMap.enabled = true
        renderer.shadowMap.type = THREE.PCFSoftShadowMap

        addLuxBar()

        return true
      }

      function addLuxBar() {
        luxBarDiv = document.createElement('div')
        luxBarDiv.style.display = 'none'
        luxBarDiv.style.position = 'absolute'
        luxBarDiv.style.width = '80%'
        luxBarDiv.style.height = '25px'
        luxBarDiv.style.left = '10%'
        luxBarDiv.style.bottom = '5%'
        luxBarDiv.style.backgroundImage =
          "url('https://litku.oss-cn-beijing.aliyuncs.com/ies/images/RainbowBar.jpg')"
        luxBarDiv.style.backgroundSize = 'cover'
        luxBarDiv.style.color = 'rgb(50,50,50)'

        // @@modify
        // document.body.appendChild(luxBarDiv);
        if (__ies.target) {
          __ies.target.appendChild(luxBarDiv)
        } else {
          document.body.appendChild(luxBarDiv)
        }

        let interval = options.display.maxLux / 10
        let numberWidth = 100 / 11
        for (let i = 0; i < 11; i++) {
          let temp = document.createElement('div')
          temp.style.display = 'inline-block'
          temp.style.lineHeight = '25px'
          temp.style.fontSize = '12px'
          temp.style.textAlign = 'center'
          temp.innerHTML = Number(interval * i)
            .toFixed(0)
            .toString()
          temp.style.width = numberWidth.toString() + '%'
          if (i < 2) {
            temp.style.color = 'rgb(180,180,180)'
          }
          luxBarDiv.appendChild(temp)
        }
      }

      function updateLuxBar() {
        let interval = options.display.maxLux / 10
        for (let i = 0; i < luxBarDiv.children.length; i++) {
          luxBarDiv.children[i].innerHTML = Number(interval * i)
            .toFixed(0)
            .toString()
        }
      }

      // Resize Window
      function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
        composer.setSize(window.innerWidth, window.innerHeight)
      }

      // Add Post Processing
      function initPostProcessing() {
        var renderPass = new THREE.RenderPass(scene, camera)

        effectLux = new THREE.ShaderPass(luxShader)
        effectLux.uniforms['tLuxLut'].value = luxTexture
        effectLux.renderToScreen = true

        composer = new THREE.EffectComposer(renderer)
        composer.addPass(renderPass)
        composer.addPass(effectLux)
      }

      // Add Stats
      function initStats() {
        stats = new Stats()
        stats.setMode(0) // 0: fps, 1: ms
        stats.domElement.style.position = 'absolute'
        stats.domElement.style.left = '0px'
        stats.domElement.style.top = '0px'

        // @@modify
        // document.body.appendChild(stats.domElement);
        if (__ies.target) {
          __ies.target.appendChild(stats.domElement)
        } else {
          document.body.appendChild(stats.domElement)
        }
      }

      /** Add GUI */
      function initGUI() {
        // @@modify
        // gui = new dat.GUI();
        gui = new __ies.dat.GUI()

        // @@modify
        if (__ies.ctrl) {
          __ies.ctrl.appendChild(gui.domElement)
        } else {
          return
        }

        var commonGui = gui.addFolder('通用功能')
        commonGui
          .add(options, 'iesLinks', Object.keys(iesLinks))
          .name('IES')
          .onChange(function(value) {
            updateIES(iesLinks[value], handleIESLoaded)
          })
        commonGui.add(options, 'scenes', Object.keys(scenes)).name('场景')
        commonGui
          .add(options.ambientLight, 'intensity', 0.0, 100.0, 1)
          .name('环境光照度(lx)')
          .onChange(function(value) {
            // @todo - correct index value is 1000/PI, but this value should be fix to lower,use 309 here
            hemiLight.intensity = value / 309.0
          })
        commonGui.open()

        objectPropertyGui = gui.addFolder('属性')
        objectPropertyGui
          .add(options.objectProperties, 'name')
          .name('名字').domElement.style.pointerEvents = 'none'
        objectPropertyGui.open()
        objectPropertyGui.hide()

        // light array
        lightArrayGui = gui.addFolder('阵列')
        lightArrayGui
          .add(options.lightArray, 'number', 1, 15, 1)
          .name('阵列排布(<16)')
          .onFinishChange(function(value) {
            if (value[0] * value[1] !== 0) {
              updateLightNumber(value[0], value[1])
            }
          })

        lightArrayGui
          .add(
            options.lightArray,
            'interval',
            0,
            2.0 / UNITS[settings.system.unit],
            0.01 / UNITS[settings.system.unit]
          )
          .name('阵列距离(cm)')
          .onFinishChange(function(value) {
            if (value[0] * value[1] !== 0) {
              updateLightInterval(
                value[0] * UNITS[settings.system.unit],
                value[1] * UNITS[settings.system.unit]
              )
            }
          })

        lightArrayGui
          .add(
            options.transform,
            'location',
            -10.0 / UNITS[settings.system.unit],
            10.0 / UNITS[settings.system.unit],
            0.1
          )
          .name('位置(cm)')
          .onFinishChange(function(value) {
            lightAnchor.position.x = value[0] * UNITS[settings.system.unit]
            lightAnchor.position.y = value[1] * UNITS[settings.system.unit]
            lightAnchor.position.z = value[2] * UNITS[settings.system.unit]
            lightAnchor.updateMatrixWorld()
          })

        var perLightRotation = lightArrayGui.addFolder('旋转')
        perLightRotation
          .add(options.lightArray, 'rotation', -180, 180, 1.0)
          .name('旋转组件(°)')
          .onFinishChange(function(value) {
            for (var i = 0; i < lightAnchor.children.length; ++i) {
              lightAnchor.children[i].rotation.set(
                (Math.PI * value[0]) / 180,
                (Math.PI * value[1]) / 180,
                (Math.PI * value[2]) / 180
              )
            }
          })
        perLightRotation
          .add(options.transform, 'rotation', -180, 180, 1)
          .name('旋转排列(°)')
          .onFinishChange(function(value) {
            lightAnchor.rotation.x = (Math.PI * value[0]) / 180
            lightAnchor.rotation.y = (Math.PI * value[1]) / 180
            lightAnchor.rotation.z = (Math.PI * value[2]) / 180
            lightAnchor.updateMatrixWorld()
          })

        perLightRotation.open()
        lightArrayGui.open()
        lightArrayGui.hide()

        // Light Array Transform
        transformGui = gui.addFolder('定位')
        translateGui = transformGui
          .add(
            options.transform,
            'location',
            -10.0 / UNITS[settings.system.unit],
            10.0 / UNITS[settings.system.unit],
            0.1
          )
          .name('位置(cm)')
          .onFinishChange(function(value) {
            if (lightMeshes.indexOf(selectedObject) > -1) {
              THREE.SceneUtils.detach(selectedObject, lightAnchor, scene)
            }
            selectedObject.position.x = value[0] * UNITS[settings.system.unit]
            selectedObject.position.y = value[1] * UNITS[settings.system.unit]
            selectedObject.position.z = value[2] * UNITS[settings.system.unit]
            selectedObject.updateMatrixWorld()
            if (lightMeshes.indexOf(selectedObject) > -1) {
              THREE.SceneUtils.attach(selectedObject, scene, lightAnchor)
            }
          })

        rotationGui = transformGui
          .add(options.transform, 'rotation', -180, 180, 1)
          .name('旋转(°)')
          .onFinishChange(function(value) {
            if (lightMeshes.indexOf(selectedObject) > -1) {
              THREE.SceneUtils.detach(selectedObject, lightAnchor, scene)
            }
            selectedObject.rotation.x = (Math.PI * value[0]) / 180
            selectedObject.rotation.y = (Math.PI * value[1]) / 180
            selectedObject.rotation.z = (Math.PI * value[2]) / 180
            selectedObject.updateMatrixWorld()
            if (lightMeshes.indexOf(selectedObject) > -1) {
              THREE.SceneUtils.attach(selectedObject, scene, lightAnchor)
            }
          })

        scaleGui = transformGui
          .add(options.transform, 'scale', 0.0, 1000.0, 1)
          .name('尺寸(cm)')
          .onFinishChange(function(value) {
            if (
              selectedObject &&
              selectedObject.hasOwnProperty('boxBoundSize')
            ) {
              selectedObject.scale.x =
                value[0] / 100 / selectedObject.boxBoundSize[0]
              selectedObject.scale.y =
                value[2] / 100 / selectedObject.boxBoundSize[2]
              selectedObject.scale.z =
                value[1] / 100 / selectedObject.boxBoundSize[1]
              selectedObject.updateMatrixWorld()
            }
          })

        //transformGui.add(options.transform, "reset").name("重置");
        transformGui.open()
        transformGui.hide()

        // light Properties
        lightPropertiesGui = gui.addFolder('光学数据')
        lightPropertiesGui
          .add(options.light, 'intensity', 0.0, 50000, 1)
          .name('光通量(lm)')
          .onChange(function(value) {
            if (lightMeshes.indexOf(selectedObject) > -1) {
              selectedObject.children[0].intensity = value / 400
            } else {
              for (let i = 0; i < lightAnchor.children.length; ++i) {
                lightAnchor.children[i].children[0].intensity = value / 400
              }
            }
          })
        lightPropertiesGui
          .add(options.light, 'CCT', 2700, 10000, 100)
          .name('CCT(K)')
          .onChange(function(value) {
            if (lightMeshes.indexOf(selectedObject) > -1) {
              selectedObject.children[0].CCT = value
              selectedObject.children[0].color.set(
                makeColorFromTemperature(value)
              )
            } else {
              for (let i = 0; i < lightAnchor.children.length; ++i) {
                lightAnchor.children[i].children[0].CCT = value
                lightAnchor.children[i].children[0].color.set(
                  makeColorFromTemperature(value)
                )
              }
            }
          })
        lightPropertiesGui.open()
        lightPropertiesGui.hide()

        // display
        displayGui = gui.addFolder('显示')
        displayGui
          .add(options.display, 'showAssist')
          .name('显示网格(25cm)')
          .onFinishChange(function(value) {
            for (let i in grids) {
              grids[i].material.visible = value
            }
          })
        displayGui
          .add(options.display, 'showLux')
          .name('显示照度')
          .onFinishChange(function(value) {
            effectLux.uniforms['bContour'].value = 0
            options.display.showContour = false
            for (let i in displayGui.__controllers) {
              displayGui.__controllers[i].updateDisplay()
            }
            updateLuxVisualize(value)
          })
        // displayGui.add(options.display, "showContour")
        //     .name("显示等高线")
        //     .onFinishChange(function (value) {
        //         effectLux.uniforms["bContour"].value = 1;
        //         options.display.showLux = false;
        //         for (let i in displayGui.__controllers) {
        //             displayGui.__controllers[i].updateDisplay();
        //         }
        //         updateLuxVisualize(value);
        //     });
        displayGui
          .add(options.display, 'maxLux', 100, 10000, 1)
          .name('最大照度')
          .onChange(function(value) {
            effectLux.uniforms['maxLux'].value = value
            updateLuxBar()
          })
        displayGui.open()

        //var buttonGui = new dat.GUI();
        //buttonGui.width = 80;
        var buttonGui = gui.addFolder('操作')
        buttonGui.add(options.buttons, 'translate')
        buttonGui.add(options.buttons, 'rotate')
        buttonGui.add(options.buttons, 'scale')
        //buttonGui.open();
      }

      function updateLuxVisualize(showType) {
        if (showType) {
          luxBarDiv.style.display = 'block'

          renderer.toneMapping = THREE.LinearToneMapping
          renderer.toneMappingExposure = 1.0
          renderer.gammaOutput = false
          renderer.gammaInput = false
          updateStaticMeshesMaterial(false)
          updateMovableMeshesMaterial(false)
        } else {
          luxBarDiv.style.display = 'none'

          renderer.toneMapping = settings.toneMapper.toneMapping
          renderer.toneMappingExposure = Math.pow(
            settings.toneMapper.toneMappingExposure,
            5.0
          )
          renderer.gammaOutput = true
          renderer.gammaInput = true

          updateStaticMeshesMaterial(true)
          updateMovableMeshesMaterial(true)
        }
      }

      /** Create Scene */
      function initScene() {
        scene = new THREE.Scene()
      }

      /** Add Camera */
      function initCamera() {
        camera = new THREE.PerspectiveCamera(
          45,
          window.innerWidth / window.innerHeight,
          0.1,
          1000
        )
        camera.position.copy(settings.camera.position)
      }

      /** Add Light */
      function initLight() {
        // Add Ambient Light
        //scene.add(ambientLight);
        scene.add(hemiLight)

        // Add Light Anchor
        lightAnchor.position.copy(settings.light.position)
        lightAnchor.name = '灯具排列'
        lightAnchor.updateMatrixWorld()
        scene.add(lightAnchor)

        // Add Lights
        updateLightNumber(
          options.lightArray.number[0],
          options.lightArray.number[1]
        )
      }

      /** Add Light To LightAnchor */
      function addLight(from, to) {
        for (let i = from; i < to; ++i) {
          // spawn light
          var newLight = new THREE.PointLight(
            0xffffff,
            settings.light.intensity,
            100,
            2
          )
          newLight.position.set(0, 0, 0)
          newLight.rotateZ(settings.light.rotationZ)
          newLight.CCT = options.light.CCT
          newLight.color = makeColorFromTemperature(options.light.CCT)
          newLight.castShadow = settings.system.quality.shadow
          newLight.shadow.mapSize.width = 512
          newLight.shadow.mapSize.height = 512
          newLight.shadow.camera.near = 0.05
          newLight.shadow.camera.far = 200

          // spawn mesh
          var newLightMesh = new THREE.Mesh(lightGeo, lightMaterial)
          newLightMesh.position.set(0, 0, 0)
          movableObjects.push(newLightMesh)
          lightMeshes.push(newLightMesh)
          newLightMesh.add(newLight)

          // spawn line
          // Use Edge Geometry To Avoid Too Many Triangles
          var newEdge = new THREE.EdgesGeometry(lightGeo)
          var newLine = new THREE.LineSegments(newEdge)
          newLine.material.color.set(0xff1e00)
          newLine.material.transparent = true
          newLine.material.depthTest = false
          newLightMesh.add(newLine)
          newLine.visible = false

          lightAnchor.add(newLightMesh)
        }
      }

      /** Remove Light Attached On LightAnchor
       * Auto GC ?
       */
      function removeLight(from, to) {
        for (let i = 0; i < from - to; ++i) {
          var last = lightAnchor.children.pop()
          movableObjects.splice(movableObjects.indexOf(last), 1)
          lightMeshes.splice(lightMeshes.indexOf(last), 1)
          scene.remove(last)
        }
      }

      /** Update Light Number In LightArray */
      function updateLightNumber(x, y) {
        var currentLightNum = lightAnchor.children.length
        var neededLightNum =
          x * y > settings.system.maxLights ? settings.system.maxLights : x * y

        if (neededLightNum > currentLightNum) {
          addLight(currentLightNum, neededLightNum)
        } else {
          removeLight(currentLightNum, neededLightNum)
        }
        for (let i = 0; i < lightAnchor.children.length; i++) {
          lightAnchor.children[i].name = '灯具 ' + (i + 1).toString()
        }

        updateLightInterval(
          options.lightArray.interval[0] * UNITS[settings.system.unit],
          options.lightArray.interval[1] * UNITS[settings.system.unit]
        )
      }

      /** Update Light Interval In LightArray */
      function updateLightInterval(x, y) {
        var currentLightNum = lightAnchor.children.length
        var row = options.lightArray.number[0]
        var tempInterval = new THREE.Vector2()
        // @todo - if number[0] * number [1] far more then 16, arrange could be error
        tempInterval.x = x * (row - 1) * 0.5
        tempInterval.y = y * (options.lightArray.number[1] - 1) * 0.5
        for (let i = 0; i < currentLightNum; ++i) {
          let columnIndex = Math.floor(i / row)
          let rowIndex = i % row

          lightAnchor.children[i].position.set(
            x * rowIndex - tempInterval.x,
            0,
            y * columnIndex - tempInterval.y
          )
        }
      }

      /** Add Object In Scene */

      // staticMesh related
      function loadNextStaticMesh() {
        if (staticMeshIndex > staticMeshResources.length - 1) {
          handleStaticMeshesLoaded()
        } else {
          GLTFloader.load(
            staticMeshResources[staticMeshIndex].url,
            function(gltf) {
              // add ref to resource
              staticMeshResources[staticMeshIndex].ref =
                gltf.scene.children[0].children[0]

              ++staticMeshIndex
              loadNextStaticMesh()
            },
            undefined,
            function(error) {
              console.log(error)
            }
          )
        }
      }

      function handleStaticMeshesLoaded() {
        for (let i in staticMeshResources) {
          let tempRef = staticMeshResources[i].ref
          if (tempRef === null) {
            continue
          }
          if (tempRef instanceof THREE.Group) {
            // load diffuse map
            for (let j in staticMeshResources[i].diffuseMap) {
              if (staticMeshResources[i].diffuseMap[j] !== '') {
                textureloader.load(
                  staticMeshResources[i].diffuseMap[j],
                  function(texture) {
                    texture.wrapS = texture.wrapT = THREE.RepeatWrapping
                    tempRef.children[j].material.map = texture
                    tempRef.children[j].material.needsUpdate = true
                  }
                )
              }
            }
            // load mormal map
            for (let k in staticMeshResources[i].normalMap) {
              if (staticMeshResources[i].normalMap[k] !== '') {
                textureloader.load(
                  staticMeshResources[i].normalMap[k],
                  function(texture) {
                    texture.wrapS = texture.wrapT = THREE.RepeatWrapping
                    //tempRef.children[j].material.map = null;
                    tempRef.children[k].material.normalMap = texture
                    tempRef.children[k].material.needsUpdate = true
                  }
                )
              }
            }
            // cache Material
            for (let l in tempRef.children) {
              staticMeshResources[i].cachedMaterials.push(
                tempRef.children[l].material
              )
              tempRef.children[l].receiveShadow = true
              //tempRef.children[l].material.map = null;
            }
            scene.add(tempRef)
          } else if (tempRef.isMesh) {
            // load diffuse map
            if (staticMeshResources[i].diffuseMap[0] !== '') {
              textureloader.load(staticMeshResources[i].diffuseMap[0], function(
                texture
              ) {
                texture.wrapS = texture.wrapT = THREE.RepeatWrapping
                tempRef.material.map = texture
                tempRef.material.needsUpdate = true
              })
            }
            // load normal map
            if (staticMeshResources[i].normalMap[0] !== '') {
              textureloader.load(staticMeshResources[i].normalMap[0], function(
                texture
              ) {
                texture.wrapS = texture.wrapT = THREE.RepeatWrapping
                //tempRef.material.map = null;
                tempRef.material.normalMap = texture
                tempRef.material.needsUpdate = true
              })
            }
            // cacheMaterial
            staticMeshResources[i].cachedMaterials.push(tempRef.material)
            tempRef.receiveShadow = true
            scene.add(tempRef)
          }
        }
      }

      function updateStaticMeshesMaterial(bRaw) {
        if (bRaw) {
          for (let refIndex in staticMeshResources) {
            let tempRef = staticMeshResources[refIndex].ref
            if (tempRef instanceof THREE.Group) {
              for (let meshIndex in tempRef.children) {
                tempRef.children[meshIndex].material =
                  staticMeshResources[refIndex].cachedMaterials[meshIndex]
                tempRef.children[meshIndex].material.needsUpdate = true
              }
            } else if (tempRef.isMesh) {
              tempRef.material =
                staticMeshResources[refIndex].cachedMaterials[0]
              tempRef.material.needsUpdate = true
            }
          }
        } else {
          for (let RefIndex in staticMeshResources) {
            let tempRef = staticMeshResources[RefIndex].ref
            if (tempRef instanceof THREE.Group) {
              for (let meshIndex in tempRef.children) {
                tempRef.children[meshIndex].material = luxMaterial
                tempRef.children[meshIndex].material.needsUpdate = true
              }
            } else if (tempRef.isMesh) {
              tempRef.material = luxMaterial
              tempRef.material.needsUpdate = true
            }
          }
        }
      }

      // movableMesh related
      function loadNextMovableMesh() {
        if (movableMeshIndex > movableMeshResources.length - 1) {
          handleMovableMeshesLoaded()
        } else {
          GLTFloader.load(
            movableMeshResources[movableMeshIndex].url,
            function(gltf) {
              // add ref to resource
              movableMeshResources[movableMeshIndex].ref =
                gltf.scene.children[0].children[0]

              ++movableMeshIndex
              loadNextMovableMesh()
            },
            undefined,
            function(error) {
              console.log(error)
            }
          )
        }
      }

      function handleMovableMeshesLoaded() {
        for (let i in movableMeshResources) {
          let tempRef = movableMeshResources[i].ref
          if (tempRef === null) {
            continue
          }
          if (tempRef instanceof THREE.Group) {
            // load diffuse map
            for (let j in movableMeshResources[i].diffuseMap) {
              if (movableMeshResources[i].diffuseMap[j] !== '') {
                textureloader.load(
                  movableMeshResources[i].diffuseMap[j],
                  function(texture) {
                    texture.wrapS = texture.wrapT = THREE.RepeatWrapping
                    tempRef.children[j].material.map = texture
                    tempRef.children[j].material.needsUpdate = true
                  }
                )
              }
            }
            // load mormal map
            for (let k in movableMeshResources[i].normalMap) {
              if (movableMeshResources[i].normalMap[k] !== '') {
                textureloader.load(
                  movableMeshResources[i].normalMap[k],
                  function(texture) {
                    texture.wrapS = texture.wrapT = THREE.RepeatWrapping
                    //tempRef.children[j].material.map = null;
                    tempRef.children[k].material.normalMap = texture
                    tempRef.children[k].material.needsUpdate = true
                  }
                )
              }
            }
            // cache Material & Add to tracable && calculate box bound
            let box = null
            for (let l in tempRef.children) {
              movableMeshResources[i].cachedMaterials.push(
                tempRef.children[l].material
              )
              tempRef.children[l].castShadow = true
              tempRef.children[l].receiveShadow = true

              let geo = tempRef.children[l].geometry
              if (geo !== undefined) {
                geo.computeBoundingBox()
                if (box === null) {
                  box = geo.boundingBox
                } else {
                  box.union(geo.boundingBox)
                }
              }

              movableObjects.push(tempRef.children[l])
              var newEdge = new THREE.EdgesGeometry(
                tempRef.children[l].geometry
              )
              var newLine = new THREE.LineSegments(newEdge)
              newLine.material.color.set(0xff1e00)
              newLine.material.transparent = true
              newLine.material.depthTest = false
              tempRef.children[l].add(newLine)
              newLine.visible = false
            }
            let tempBoundBox = box.max.clone().sub(box.min)
            movableMeshResources[i].boundBox[0] = tempBoundBox.x
            movableMeshResources[i].boundBox[1] = tempBoundBox.y
            movableMeshResources[i].boundBox[2] = tempBoundBox.z
          } else if (tempRef.isMesh) {
            // load diffuse map
            if (movableMeshResources[i].diffuseMap[0] !== '') {
              textureloader.load(
                movableMeshResources[i].diffuseMap[0],
                function(texture) {
                  texture.wrapS = texture.wrapT = THREE.RepeatWrapping
                  tempRef.material.map = texture
                  tempRef.material.needsUpdate = true
                }
              )
            }
            // load normal map
            if (movableMeshResources[i].normalMap[0] !== '') {
              textureloader.load(movableMeshResources[i].normalMap[0], function(
                texture
              ) {
                texture.wrapS = texture.wrapT = THREE.RepeatWrapping
                //tempRef.material.map = null;
                tempRef.material.normalMap = texture
                tempRef.material.needsUpdate = true
              })
            }
            // cache Material & Add to tracable
            movableMeshResources[i].cachedMaterials.push(tempRef.material)
            tempRef.castShadow = true
            tempRef.receiveShadow = true
            movableObjects.push(tempRef)

            tempRef.geometry.computeBoundingBox()
            let tempBoundBox = tempRef.geometry.boundingBox.max
              .clone()
              .sub(tempRef.geometry.boundingBox.min)
            movableMeshResources[i].boundBox[0] = tempBoundBox.x
            movableMeshResources[i].boundBox[1] = tempBoundBox.y
            movableMeshResources[i].boundBox[2] = tempBoundBox.z

            var newEdge = new THREE.EdgesGeometry(tempRef.geometry)
            var newLine = new THREE.LineSegments(newEdge)
            newLine.material.color.set(0xff1e00)
            newLine.material.transparent = true
            newLine.material.depthTest = false
            tempRef.add(newLine)
            newLine.visible = false

            // update material
            if (movableMeshResources[i].hasOwnProperty('initMaterial')) {
              tempRef.material.metalness =
                movableMeshResources[i].initMaterial.metalness
              tempRef.material.roughness =
                movableMeshResources[i].initMaterial.roughness
            }
          }
          // update transoform
          tempRef.position.set(
            movableMeshResources[i].initPostion[0],
            movableMeshResources[i].initPostion[1],
            movableMeshResources[i].initPostion[2]
          )
          tempRef.rotation.set(
            movableMeshResources[i].initRotation[0],
            movableMeshResources[i].initRotation[1],
            movableMeshResources[i].initRotation[2]
          )
          tempRef.scale.set(
            movableMeshResources[i].initScale[0],
            movableMeshResources[i].initScale[1],
            movableMeshResources[i].initScale[2]
          )
          tempRef.boxBoundSize = movableMeshResources[i].boundBox
          // add to scene
          tempRef.name = movableMeshResources[i].label
          scene.add(tempRef)
        }
      }

      function updateMovableMeshesMaterial(bRaw) {
        if (bRaw) {
          for (let refIndex in movableMeshResources) {
            let tempRef = movableMeshResources[refIndex].ref
            if (tempRef instanceof THREE.Group) {
              for (let meshIndex in tempRef.children) {
                tempRef.children[meshIndex].material =
                  movableMeshResources[refIndex].cachedMaterials[meshIndex]
                tempRef.children[meshIndex].material.needsUpdate = true
              }
            } else if (tempRef.isMesh) {
              tempRef.material =
                movableMeshResources[refIndex].cachedMaterials[0]
              tempRef.material.needsUpdate = true
            }
          }
        } else {
          for (let RefIndex in movableMeshResources) {
            let tempRef = movableMeshResources[RefIndex].ref
            if (tempRef instanceof THREE.Group) {
              for (let meshIndex in tempRef.children) {
                tempRef.children[meshIndex].material = luxMaterial
                tempRef.children[meshIndex].material.needsUpdate = true
              }
            } else if (tempRef.isMesh) {
              tempRef.material = luxMaterial
              tempRef.material.needsUpdate = true
            }
          }
        }
      }

      function showMovableOutline(bShow) {
        for (let refIndex in movableMeshResources) {
          let tempRef = movableMeshResources[refIndex].ref
          if (tempRef instanceof THREE.Group) {
            for (let meshIndex in tempRef.children) {
              tempRef.children[meshIndex].children[0].visible = bShow
            }
          } else if (tempRef.isMesh) {
            tempRef.children[0].visible = bShow
          }
        }
      }

      function initObject() {
        loadNextStaticMesh()
        loadNextMovableMesh()

        // Add Grid
        var interval = 0.25
        var gridHori = new ScaleGridHelper(
          new THREE.Vector2(5, 4),
          new THREE.Vector2(5 / interval, 4 / interval)
        )
        gridHori.position.set(0.0, 0.01, 0.0)
        gridHori.material.transparent = true
        gridHori.material.opacity = 0.3
        gridHori.material.visible = false
        scene.add(gridHori)
        grids.push(gridHori)

        var gridVert = new ScaleGridHelper(
          new THREE.Vector2(5, 3),
          new THREE.Vector2(5 / interval, 3 / interval)
        )
        gridVert.position.set(0.0, 1.5, -1.99)
        gridVert.rotateX(Math.PI * 0.5)
        gridVert.material.transparent = true
        gridVert.material.opacity = 0.3
        gridVert.material.visible = false
        scene.add(gridVert)
        grids.push(gridVert)
      }

      /** Render All */

      var now
      var then = Date.now()
      var frameInterval = 1000 / settings.system.quality.fps
      var delta

      function render() {
        requestAnimationFrame(render)

        now = Date.now()
        delta = now - then
        if (delta > frameInterval) {
          if (options.display.showLux || options.display.showContour) {
            composer.render(delta)
          } else {
            renderer.render(scene, camera)
          }

          then = now - (delta % frameInterval)

          stats.update()
        }
      }

      // update Light intensity After load IES
      function handleIESLoaded() {
        for (let i = 0; i < lightAnchor.children.length; ++i) {
          lightAnchor.children[i].children[0].intensity =
            IES_Attribute.Integral / 400
        }
        options.light.intensity = IES_Attribute.Integral
        for (let i in gui.__folders['光学数据'].__controllers) {
          gui.__folders['光学数据'].__controllers[i].updateDisplay()
        }
      }

      /** Main */
      function main() {
        if (initRenderer() === false) {
          return
        }

        initGUI() // 操作框
        initStats() // FPS框

        initScene()
        initCamera()
        initPostProcessing()
        initControls()
        initLight() // render 灯

        // @@modify 默认值
        // updateIES(iesLinks.ies_24D, handleIESLoaded)
        var defaultIES
        if (__ies.iesLinks && __ies.config.ies) {
          defaultIES = __ies.iesLinks[__ies.config.ies]
        } else if (__ies.iesLinks) {
          defaultIES = __ies.iesLinks[Object.keys(__ies.iesLinks)[0]]
        } else {
          defaultIES = iesLinks.ies_24D
        }
        updateIES(defaultIES, handleIESLoaded)

        initObject() // render 场景物体

        // Attach TransformControl
        scene.add(transformControl)
        selectedObject = lightAnchor
        transformControl.attach(lightAnchor)
        updateTransformGUI()
        updateLightGUI()
        showTransformGUI()
        showLightGUI()
        showObjectPropertyGUI()
        for (let i in lightAnchor.children) {
          lightAnchor.children[i].material = selectedMaterial
          lightAnchor.children[i].children[1].visible = true
        }

        render()
      }

      /** Run Script */
      main()
    })
  }
}

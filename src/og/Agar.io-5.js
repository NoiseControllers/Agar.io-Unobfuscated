!function(e, i) {
    function n() {
        Be = !0, document.getElementById("canvas").focus();
        var t, n = !1;
        L = X = document.getElementById("canvas"), W = L.getContext("2d"), L.onmousemove = function(t) {
            ge = t.clientX, me = t.clientY, l();
        }, H && (L.addEventListener("touchstart", s, !1), L.addEventListener("touchmove", o, !1), 
        L.addEventListener("touchend", a, !1)), L.onmouseup = function() {}, /firefox/i.test(navigator.userAgent) ? document.addEventListener("DOMMouseScroll", h, !1) : document.body.onmousewheel = h, 
        L.onfocus = function() {
            n = !1;
        }, document.getElementById("chat_textbox").onblur = function() {
            n = !1;
        }, document.getElementById("chat_textbox").onfocus = function() {
            n = !0;
        };
        var r = !1, c = !1, f = !1, g = !1, m = !1, v = !1, p = !1;
        e.onkeydown = function(e) {
            switch (e.keyCode) {
              case 13:
                n || Ne ? (n = !1, document.getElementById("chat_textbox").blur(), t = document.getElementById("chat_textbox").value, 
                t.length > 0 && F(t), document.getElementById("chat_textbox").value = "") : Ye || (document.getElementById("chat_textbox").focus(), 
                n = !0);
                break;

              case 32:
                r || n || (z(), A(17), r = !0);
                break;

              case 87:
                p || n || (z(), A(21), p = !0);
                break;

              case 81:
                c || n || (A(18), c = !0);
                break;

              case 69:
                f || n || (z(), A(22));
                break;

              case 82:
                g || n || (z(), A(23), rMacro || (g = !0));
                break;

              case 84:
                m || n || (z(), A(24), m = !0);
                break;

              case 80:
                v || n || (z(), A(25), v = !0);
                break;

              case 27:
                u(!0);
            }
        }, e.onkeyup = function(t) {
            switch (t.keyCode) {
              case 32:
                r = !1;
                break;

              case 87:
                p = !1;
                break;

              case 81:
                c && (A(19), c = !1);
                break;

              case 69:
                f = !1;
                break;

              case 82:
                g = !1;
                break;

              case 84:
                m = !1;
                break;

              case 80:
                v = !1;
            }
        }, e.onblur = function() {
            A(19), p = r = c = f = g = m = v = !1;
        }, e.onresize = C, C(), e.requestAnimationFrame ? e.requestAnimationFrame(_) : setInterval(P, 1e3 / 60), 
        setInterval(z, 40), null == se && d(), i("#overlays").show();
    }
    function s(t) {
        for (var e = 0; e < t.changedTouches.length; e++) {
            var i = t.changedTouches[e];
            0 > Z && i.clientX < J / 2 && (Z = i.identifier, te.reset(i.clientX, i.clientY), 
            K.copyFrom(te), ee.reset(0, 0));
            var n = ~~(J / 7);
            i.clientX > J - n && i.clientY > G - n && (z(), A(17)), i.clientX > J - n && i.clientY > G - 2 * n - 10 && i.clientY < G - n - 10 && (z(), 
            A(21));
        }
        Q = t.touches;
    }
    function o(t) {
        t.preventDefault();
        for (var e = 0; e < t.changedTouches.length; e++) {
            var i = t.changedTouches[e];
            Z == i.identifier && (K.reset(i.clientX, i.clientY), ee.copyFrom(K), ee.minusEq(te), 
            ge = 3 * ee.x + J / 2, me = 3 * ee.y + G / 2, l(), z());
        }
        Q = t.touches;
    }
    function a(t) {
        Q = t.touches;
        for (var e = 0; e < t.changedTouches.length; e++) {
            var i = t.changedTouches[e];
            if (Z == i.identifier) {
                Z = -1, ee.reset(0, 0);
                break;
            }
        }
    }
    function h(t) {
        Je *= Math.pow(.9, t.wheelDelta / -120 || t.detail || 0), 1 > Je && (Je = 1), Je > 4 / Fe && (Je = 4 / Fe);
    }
    function r() {
        if (.4 > Fe) ne = null; else {
            for (var t = Number.POSITIVE_INFINITY, e = Number.POSITIVE_INFINITY, i = Number.NEGATIVE_INFINITY, n = Number.NEGATIVE_INFINITY, s = 0, o = 0; o < ce.length; o++) {
                var a = ce[o];
                a.shouldRender() && !a.prepareData && 20 < a.size * Fe && (s = Math.max(a.size, s), 
                t = Math.min(a.x, t), e = Math.min(a.y, e), i = Math.max(a.x, i), n = Math.max(a.y, n));
            }
            for (ne = ri.init({
                minX: t - (s + 100),
                minY: e - (s + 100),
                maxX: i + (s + 100),
                maxY: n + (s + 100),
                maxChildren: 2,
                maxDepth: 4
            }), o = 0; o < ce.length; o++) if (a = ce[o], a.shouldRender() && !(20 >= a.size * Fe)) for (t = 0; t < a.points.length; ++t) e = a.points[t].x, 
            i = a.points[t].y, oe - J / 2 / Fe > e || ae - G / 2 / Fe > i || e > oe + J / 2 / Fe || i > ae + G / 2 / Fe || ne.insert(a.points[t]);
        }
    }
    function l() {
        ve = (ge - J / 2) / Fe + oe, pe = (me - G / 2) / Fe + ae;
    }
    function c() {
        Ye = !1, i("#overlays").hide();
    }
    function u(t) {
        Ye = !0, we = null, i("#overlays").fadeIn(t ? 200 : 3e3);
    }
    function d() {
        Be && (i("#connecting").show(), f((ie ? "wss://" : "ws://") + Y));
    }
    function f(t) {
        if (se) {
            se.onopen = null, se.onmessage = null, se.onclose = null;
            try {
                se.close();
            } catch (e) {}
            se = null;
        }
        var i = Y;
        t = (ie ? "wss://" : "ws://") + i, he = [], re = [], le = {}, ce = [], ue = [], 
        de = [], L = De = null, Te = 0, log.info("Connecting to " + t + ".."), se = new WebSocket(t), 
        se.binaryType = "arraybuffer", se.onopen = v, se.onmessage = y, se.onclose = p;
    }
    function g(t) {
        return new DataView(new ArrayBuffer(t));
    }
    function m(t) {
        se.send(t.buffer);
    }
    function v() {
        var t;
        ti = 500, i("#connecting").hide(), t = g(5), t.setUint8(0, 254), t.setUint32(1, 5, !0), 
        m(t), t = g(5), t.setUint8(0, 255), t.setUint32(1, 0, !0), m(t), k(), log.info("Connection successful!");
    }
    function p() {
        setTimeout(d, ti), ti *= 1.5;
    }
    function y(t) {
        x(new DataView(t.data));
    }
    function x(t) {
        function e() {
            for (var e, n = ""; 0 != (e = t.getUint16(i, !0)); ) i += 2, n += String.fromCharCode(e);
            return i += 2, n;
        }
        var i = 0, n = !1;
        switch (240 == t.getUint8(i) && (i += 5), t.getUint8(i++)) {
          case 16:
            S(t, i);
            break;

          case 17:
            Ee = t.getFloat32(i, !0), i += 4, Oe = t.getFloat32(i, !0), i += 4, Ve = t.getFloat32(i, !0), 
            i += 4;
            break;

          case 20:
            re = [], he = [];
            break;

          case 21:
            Xe = t.getInt16(i, !0), i += 2, We = t.getInt16(i, !0), i += 2, Re || (Re = !0, 
            $e = Xe, Le = We);
            break;

          case 32:
            he.push(t.getUint32(i, !0)), i += 4;
            break;

          case 48:
            n = !0, Ze = !0;
            break;

          case 49:
            n || (Ze = !1), De = null;
            var s = t.getUint32(i, !0);
            for (i += 4, de = [], h = 0; s > h; ++h) {
                var o = t.getUint32(i, !0);
                i += 4, de.push({
                    id: o,
                    name: e()
                });
            }
            V();
            break;

          case 50:
            De = [];
            var a = t.getUint32(i, !0);
            i += 4;
            for (var h = 0; a > h; ++h) De.push(t.getFloat32(i, !0)), i += 4;
            V();
            break;

          case 64:
            be = t.getFloat64(i, !0), i += 8, Se = t.getFloat64(i, !0), i += 8, ze = t.getFloat64(i, !0), 
            i += 8, ke = t.getFloat64(i, !0), i += 8, Ee = (ze + be) / 2, Oe = (ke + Se) / 2, 
            Ve = 1, 0 == re.length && (oe = Ee, ae = Oe, Fe = Ve);
            break;

          case 99:
            w(t, i);
        }
    }
    function w(t, e) {
        function i() {
            for (var i, n = ""; 0 != (i = t.getUint16(e, !0)); ) e += 2, n += String.fromCharCode(i);
            return e += 2, n;
        }
        for (var n = (t.getUint8(e++), t.getUint8(e++)), s = t.getUint8(e++), o = t.getUint8(e++), a = (n << 16 | s << 8 | o).toString(16); a.length < 6; ) a = "0" + a;
        a = "#" + a, fe.push({
            name: i(),
            color: a,
            message: i(),
            time: Date.now()
        }), b();
    }
    function b() {
        if (Ne) return void (q = null);
        q = document.createElement("canvas");
        var t = q.getContext("2d"), e = Math.min(Math.max(J / 1200, .75), 1);
        q.width = 1e3 * e, q.height = 550 * e, t.scale(e, e);
        var i = Date.now(), n = 0;
        if (fe.length >= 1) {
            n = fe[fe.length - 1].time;
            var s = i - n;
            t.globalAlpha = .8 * Math.exp(-s / 25e3);
            var o = fe.length, a = o - 15;
            0 > a && (a = 0);
            for (var h = 0; o - a > h; h++) {
                var r = new B(18, fe[h + a].color);
                r.setValue(fe[h + a].name);
                var l = r.getWidth(), c = r.render();
                t.drawImage(c, 15, q.height / e - 24 * (o - h - a));
                var u = new B(18, "#666666");
                u.setValue(":" + fe[h + a].message), c = u.render(), t.drawImage(c, 15 + 1.8 * l, q.height / e - 24 * (o - a - h));
            }
        }
    }
    function S(e, i) {
        xe = +new Date();
        var n = Math.random();
        Ce = !1;
        var s = e.getUint16(i, !0);
        for (i += 2, h = 0; s > h; ++h) {
            var o = le[e.getUint32(i, !0)], a = le[e.getUint32(i + 4, !0)];
            i += 8, o && a && (a.destroy(), a.ox = a.x, a.oy = a.y, a.oSize = a.size, a.nx = o.x, 
            a.ny = o.y, a.nSize = a.size, a.updateTime = xe);
        }
        for (var h = 0; ;) {
            var r = e.getUint32(i, !0);
            if (i += 4, 0 == r) break;
            ++h;
            var l, c, d = e.getInt32(i, !0);
            i += 4, c = e.getInt32(i, !0), i += 4, l = e.getInt16(i, !0), i += 2;
            for (var f = e.getUint8(i++), g = e.getUint8(i++), m = e.getUint8(i++), v = (f << 16 | g << 8 | m).toString(16); 6 > v.length; ) v = "0" + v;
            var p = "#" + v, y = e.getUint8(i++), x = !!(1 & y), w = !!(32 & y), b = !!(16 & y), S = "";
            if (2 & y && (i += 4), 4 & y) for (;t = 127 & e.getUint8(i, !0), i += 1, 0 != t; ) S += String.fromCharCode(t);
            for (var z, k = ""; z = e.getUint16(i, !0), i += 2, 0 != z; ) k += String.fromCharCode(z);
            var F = null;
            le.hasOwnProperty(r) ? (F = le[r], F.updatePos(), F.ox = F.x, F.oy = F.y, F.oSize = F.size, 
            F.color = p) : (F = new D(r, d, c, l, p, k, S), ce.push(F), le[r] = F, F.ka = d, 
            F.la = c), F.isVirus = x, F.isEjected = w, F.isAgitated = b, F.nx = d, F.ny = c, 
            F.setSize(l), F.updateCode = n, F.updateTime = xe, F.flag = y, k && F.setName(k), 
            -1 != he.indexOf(r) && -1 == re.indexOf(F) && (document.getElementById("overlays").style.display = "none", 
            re.push(F), 1 == re.length && (oe = F.x, ae = F.y));
        }
        for (s = e.getUint32(i, !0), i += 4, h = 0; s > h; h++) {
            var I = e.getUint32(i, !0);
            i += 4, F = le[I], null != F && F.destroy();
        }
        Ce && 0 == re.length && u(!1);
    }
    function z() {
        var t;
        if (I()) {
            t = ge - J / 2;
            var e = me - G / 2;
            t * t + e * e >= 64 && !(.01 > Math.abs(ei - ve) && .01 > Math.abs(ii - pe)) && (ei = ve, 
            ii = pe, t = g(21), t.setUint8(0, 16), t.setFloat64(1, ve, !0), t.setFloat64(9, pe, !0), 
            t.setUint32(17, 0, !0), m(t));
        }
    }
    function k() {
        if (I() && null != we) {
            var t = g(1 + 2 * we.length);
            t.setUint8(0, 0);
            for (var e = 0; e < we.length; ++e) t.setUint16(1 + 2 * e, we.charCodeAt(e), !0);
            m(t);
        }
    }
    function F(t) {
        if (I() && t.length < 200 && t.length > 0 && !Ne) {
            var e = g(2 + 2 * t.length), i = 0;
            e.setUint8(i++, 99), e.setUint8(i++, 0);
            for (var n = 0; n < t.length; ++n) e.setUint16(i, t.charCodeAt(n), !0), i += 2;
            m(e);
        }
    }
    function I() {
        return null != se && se.readyState == se.OPEN;
    }
    function A(t) {
        if (I()) {
            var e = g(1);
            e.setUint8(0, t), m(e);
        }
    }
    function _() {
        P(), e.requestAnimationFrame(_);
    }
    function C() {
        window.scrollTo(0, 0), J = e.innerWidth, G = e.innerHeight, X.width = J, X.height = G, 
        P();
    }
    function T() {
        var t;
        return t = Math.max(G / 1080, J / 1920), t * Je;
    }
    function M() {
        if (0 != re.length) {
            for (var t = 0, e = 0; e < re.length; e++) t += re[e].size;
            t = Math.pow(Math.min(64 / t, 1), .4) * T(), Fe = (9 * Fe + t) / 10;
        }
    }
    function P() {
        var t, e = Date.now();
        if (++ye, xe = e, 0 < re.length) {
            M();
            for (var i = t = 0, n = 0; n < re.length; n++) re[n].updatePos(), t += re[n].x / re.length, 
            i += re[n].y / re.length;
            Ee = t, Oe = i, Ve = Fe, oe = (oe + t) / 2, ae = (ae + i) / 2;
        } else oe = (29 * oe + Ee) / 30, ae = (29 * ae + Oe) / 30, Fe = (9 * Fe + Ve * T()) / 10;
        for (r(), l(), qe || W.clearRect(0, 0, J, G), qe ? Me ? (W.fillStyle = "#111111", 
        W.globalAlpha = .05, W.fillRect(0, 0, J, G), W.globalAlpha = 1) : (W.fillStyle = "#F2FBFF", 
        W.globalAlpha = .05, W.fillRect(0, 0, J, G), W.globalAlpha = 1) : U(), ce.sort(function(t, e) {
            return t.size === e.size ? t.id - e.id : t.size - e.size;
        }), W.save(), W.translate(J / 2, G / 2), W.scale(Fe, Fe), W.translate(-oe, -ae), 
        n = 0; n < ue.length; n++) ue[n].drawOneCell(W);
        for (n = 0; n < ce.length; n++) ce[n].drawOneCell(W);
        if (Re) {
            for ($e = (3 * $e + Xe) / 4, Le = (3 * Le + We) / 4, W.save(), W.strokeStyle = "#FFAAAA", 
            W.lineWidth = 10, W.lineCap = "round", W.lineJoin = "round", W.globalAlpha = .5, 
            W.beginPath(), n = 0; n < re.length; n++) W.moveTo(re[n].x, re[n].y), W.lineTo($e, Le);
            W.stroke(), W.restore();
        }
        W.restore(), j && j.width && W.drawImage(j, J - j.width - 10, 10), null != q && W.drawImage(q, 0, G - q.height - 50), 
        Te = Math.max(Te, O()), 0 != Te && (null == si && (si = new B(24, "#FFFFFF")), si.setValue("Score: " + ~~(Te / 100)), 
        i = si.render(), t = i.width, W.globalAlpha = .2, W.fillStyle = "#000000", W.fillRect(10, 10, t + 10, 34), 
        W.globalAlpha = 1, W.drawImage(i, 15, 15)), E(W), N(W);
        var s = Date.now() - e;
        s > 1e3 / 60 ? ni -= .01 : 1e3 / 65 > s && (ni += .01), .4 > ni && (ni = .4), ni > 1 && (ni = 1);
    }
    function N(t) {
        if (t.save(), H) for (var e = 0; e < Q.length; e++) {
            var i = Q[e];
            i.identifier == Z ? (t.beginPath(), t.strokeStyle = "#0096ff", t.lineWidth = 6, 
            t.arc(te.x, te.y, 40, 0, 2 * Math.PI, !0), t.stroke(), t.beginPath(), t.strokeStyle = "#0096ff", 
            t.lineWidth = 2, t.arc(te.x, te.y, 60, 0, 2 * Math.PI, !0), t.stroke(), t.beginPath(), 
            t.strokeStyle = "#0096ff", t.arc(K.x, K.y, 40, 0, 2 * Math.PI, !0), t.stroke()) : (t.beginPath(), 
            t.beginPath(), t.strokeStyle = "#0096ff", t.lineWidth = "6", t.arc(i.clientX, i.clientY, 40, 0, 2 * Math.PI, !0), 
            t.stroke());
        }
        t.restore();
    }
    function U() {
        W.fillStyle = Me ? "#111111" : "#F2FBFF", W.fillRect(0, 0, J, G), W.save(), W.strokeStyle = Me ? "#AAAAAA" : "#000000", 
        W.globalAlpha = .2, W.scale(Fe, Fe);
        for (var t = J / Fe, e = G / Fe, i = -.5 + (-oe + t / 2) % 50; t > i; i += 50) W.moveTo(i, 0), 
        W.lineTo(i, e);
        for (W.stroke(), W.beginPath(), i = -.5 + (-ae + e / 2) % 50; e > i; i += 50) W.moveTo(0, i), 
        W.lineTo(t, i);
        W.stroke(), W.restore();
    }
    function E(t) {
        if (Ge && He.width) {
            var e = ~~(J / 7);
            t.drawImage(He, J - e, G - e, e, e);
        }
        if (Ge && He.width) {
            var e = ~~(J / 7);
            t.drawImage(Qe, J - e, G - 2 * e - 10, e, e);
        }
    }
    function O() {
        for (var t = 0, e = 0; e < re.length; e++) t += re[e].nSize * re[e].nSize;
        return t;
    }
    function V() {
        j = null;
        var t = null != De;
        if ((t || 0 != de.length) && (t || Ae)) {
            j = document.createElement("canvas");
            var e = j.getContext("2d"), i = 60;
            i = t ? i + 180 : i + 24 * de.length;
            var n = .005 * Math.min(.22 * G, Math.min(200, .3 * J));
            j.width = 200 * n, j.height = i * n, e.scale(n, n), e.globalAlpha = .4, e.fillStyle = "#000000", 
            e.fillRect(0, 0, 200, i), e.globalAlpha = 1, e.fillStyle = "#FFFFFF";
            var s = "Leaderboard";
            e.font = "30px Ubuntu", e.fillText(s, 100 - .5 * e.measureText(s).width, 40);
            var o, a;
            if (t) for (o = s = 0; o < De.length; ++o) {
                var h = s + De[o] * Math.PI * 2;
                e.fillStyle = je[o + 1], e.beginPath(), e.moveTo(100, 140), e.arc(100, 140, 80, s, h, !1), 
                e.fill(), s = h;
            } else for (e.font = "20px Ubuntu", o = 0, a = de.length; a > o; ++o) {
                s = de[o].name || "An unnamed cell", Ae || (s = "An unnamed cell");
                var r = -1 != he.indexOf(de[o].id);
                r && re[0].name && (s = re[0].name), e.fillStyle = r ? "#FFAAAA" : "#FFFFFF", Ze || (s = o + 1 + ". " + s);
                var l = e.measureText(s).width > 200 ? 2 : 100 - .5 * e.measureText(s).width;
                e.fillText(s, l, 70 + 24 * o);
            }
        }
    }
    function D(t, e, i, n, s, o, a) {
        this.id = t, this.ox = this.x = e, this.oy = this.y = i, this.oSize = this.size = n, 
        this.color = s, this.points = [], this.pointsAcc = [], this.createPoints(), this.setName(o), 
        this._skin = a;
    }
    function B(t, e, i, n) {
        t && (this._size = t), e && (this._color = e), this._stroke = !!i, n && (this._strokeColor = n);
    }
    var Y = "127.0.0.1:443", R = "./skins/";
    e.setserver = function(t) {
        t != Y && (Y = t, d());
    };
    var X, W, L, j, q, J, G, H = "createTouch" in document, Q = [], Z = -1, K = new Vector2(0, 0), te = new Vector2(0, 0), ee = new Vector2(0, 0), ie = "https:" == e.location.protocol, ne = (e.location.protocol, 
    null), se = null, oe = 0, ae = 0, he = [], re = [], le = {}, ce = [], ue = [], de = [], fe = [], ge = 0, me = 0, ve = -1, pe = -1, ye = 0, xe = 0, we = null, be = 0, Se = 0, ze = 1e4, ke = 1e4, Fe = 1, Ie = !0, Ae = !0, _e = !1, Ce = !1, Te = 0, Me = !1, Pe = !1, Ne = !1, Ue = .4, Ee = oe = ~~((be + ze) / 2), Oe = ae = ~~((Se + ke) / 2), Ve = 1, De = null, Be = !1, Ye = !0, Re = !1, Xe = 0, We = 0, $e = 0, Le = 0, je = [ "#333333", "#FF3333", "#33FF33", "#3333FF" ], qe = !1, Je = 1, Ge = "ontouchstart" in e && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent), He = new Image(), Qe = new Image(), Ze = !1;
    He.src = "assets/img/split.png", Qe.src = "assets/img/feed.png";
    document.createElement("canvas");
    e.isSpectating = !1, e.setNick = function(t) {
        c(), we = t, k(), Te = 0;
    }, e.setSkins = function(t) {
        Ie = t;
    }, e.setNames = function(t) {
        Ae = t;
    }, e.setDarkTheme = function(t) {
        Me = t;
    }, e.setColors = function(t) {
        _e = t;
    }, e.setShowMass = function(t) {
        Pe = t;
    }, e.setSmooth = function(t) {
        Ue = t ? 2 : .4;
    }, e.setChatHide = function(t) {
        Ne = t, Ne ? i("#chat_textbox").hide() : i("#chat_textbox").show();
    }, e.spectate = function() {
        we = null, e.isSpectating = !0, A(1), c();
    }, e.setAcid = function(t) {
        qe = t;
    }, e.openSkinsList = function() {
        "Skins" != $("#inPageModalTitle").text() && $.get("include/gallery.php").then(function(t) {
            $("#inPageModalTitle").text("Skins"), $("#inPageModalBody").html(t);
        });
    }, null != e.localStorage && (i(window).load(function() {
        i(".save").each(function() {
            var t = $(this).data("box-id"), i = e.localStorage.getItem("checkbox-" + t);
            i && "true" == i && 0 != t ? ($(this).prop("checked", "true"), $(this).trigger("change")) : 0 == t && null != i && $(this).val(i);
        }), i(".save").change(function() {
            var t = $(this).data("box-id"), i = 0 == t ? $(this).val() : $(this).prop("checked");
            e.localStorage.setItem("checkbox-" + t, i);
        });
    }), null == e.localStorage.AB8 && (e.localStorage.AB8 = ~~(100 * Math.random()))), 
    setTimeout(function() {}, 3e5);
    e.connect = f;
    var Ke = {
        action: "test"
    };
    i.ajax({
        type: "POST",
        dataType: "json",
        url: "checkdir.php",
        data: Ke,
        success: function(t) {
            response = JSON.parse(t.names);
            for (var e = 0; e < response.length; e++) -1 == ai.indexOf(response[e]) && ai.push(response[e]);
        }
    });
    var ti = 500, ei = -1, ii = -1, ni = 1, si = null, oi = {}, ai = "".split(";"), hi = [];
    D.prototype = {
        id: 0,
        points: null,
        pointsAcc: null,
        name: null,
        nameCache: null,
        sizeCache: null,
        x: 0,
        y: 0,
        size: 0,
        ox: 0,
        oy: 0,
        oSize: 0,
        nx: 0,
        ny: 0,
        nSize: 0,
        flag: 0,
        updateTime: 0,
        updateCode: 0,
        drawTime: 0,
        destroyed: !1,
        isVirus: !1,
        isEjected: !1,
        isAgitated: !1,
        wasSimpleDrawing: !0,
        destroy: function() {
            var t;
            for (t = 0, len = ce.length; len > t; t++) if (ce[t] === this) {
                ce.splice(t, 1);
                break;
            }
            delete le[this.id], t = re.indexOf(this), -1 != t && (Ce = !0, re.splice(t, 1)), 
            t = he.indexOf(this.id), -1 != t && he.splice(t, 1), this.destroyed = !0, ue.push(this);
        },
        getNameSize: function() {
            return Math.max(~~(.3 * this.size), 24);
        },
        setName: function(t) {
            this.name = t, null == this.nameCache ? (this.nameCache = new B(this.getNameSize(), "#FFFFFF", !0, "#000000"), 
            this.nameCache.setValue(this.name)) : (this.nameCache.setSize(this.getNameSize()), 
            this.nameCache.setValue(this.name));
        },
        setSize: function(t) {
            this.nSize = t;
            ~~(this.size * this.size * .01);
            null === this.sizeCache ? this.sizeCache = new B(.5 * this.getNameSize(), "#FFFFFF", !0, "#000000") : this.sizeCache.setSize(.5 * this.getNameSize());
        },
        createPoints: function() {
            for (var t = this.getNumPoints(); this.points.length > t; ) {
                var e = ~~(Math.random() * this.points.length);
                this.points.splice(e, 1), this.pointsAcc.splice(e, 1);
            }
            for (0 == this.points.length && t > 0 && (this.points.push({
                ref: this,
                size: this.size,
                x: this.x,
                y: this.y
            }), this.pointsAcc.push(Math.random() - .5)); this.points.length < t; ) {
                var i = ~~(Math.random() * this.points.length), n = this.points[i];
                this.points.splice(i, 0, {
                    ref: this,
                    size: n.size,
                    x: n.x,
                    y: n.y
                }), this.pointsAcc.splice(i, 0, this.pointsAcc[i]);
            }
        },
        getNumPoints: function() {
            if (0 == this.id) return 16;
            var t = 10;
            20 > this.size && (t = 0), this.isVirus && (t = 30);
            var e = this.size;
            return this.isVirus || (e *= Fe), e *= ni, 32 & this.flag && (e *= .25), ~~Math.max(e, t);
        },
        movePoints: function() {
            this.createPoints();
            for (var t = this.points, e = this.pointsAcc, i = t.length, n = 0; i > n; ++n) {
                var s = e[(n - 1 + i) % i], o = e[(n + 1) % i];
                e[n] += (Math.random() - .5) * (this.isAgitated ? 3 : 1), e[n] *= .7, 10 < e[n] && (e[n] = 10), 
                -10 > e[n] && (e[n] = -10), e[n] = (s + o + 8 * e[n]) / 10;
            }
            for (var a = this, h = this.isVirus ? 0 : (this.id / 1e3 + xe / 1e4) % (2 * Math.PI), r = 0; i > r; ++r) {
                var l = t[r].size, c = t[(r - 1 + i) % i].size, u = t[(r + 1) % i].size;
                if (15 < this.size && null != ne && 20 < this.size * Fe && 0 != this.id) {
                    var d = !1, f = t[r].x, g = t[r].y;
                    ne.retrieve2(f - 5, g - 5, 10, 10, function(t) {
                        t.ref != a && 25 > (f - t.x) * (f - t.x) + (g - t.y) * (g - t.y) && (d = !0);
                    }), (!d && t[r].x < be || t[r].y < Se || t[r].x > ze || t[r].y > ke) && (d = !0), 
                    d && (0 < e[r] && (e[r] = 0), e[r] -= 1);
                }
                l += e[r], 0 > l && (l = 0), l = this.isAgitated ? (19 * l + this.size) / 20 : (12 * l + this.size) / 13, 
                t[r].size = (c + u + 8 * l) / 10, c = 2 * Math.PI / i, u = this.points[r].size, 
                this.isVirus && 0 == r % 2 && (u += 5), t[r].x = this.x + Math.cos(c * r + h) * u, 
                t[r].y = this.y + Math.sin(c * r + h) * u;
            }
        },
        updatePos: function() {
            if (0 == this.id) return 1;
            var t;
            t = (xe - this.updateTime) / 120, t = 0 > t ? 0 : t > 1 ? 1 : t;
            var e = 0 > t ? 0 : t > 1 ? 1 : t;
            if (this.getNameSize(), this.destroyed && e >= 1) {
                var i = ue.indexOf(this);
                -1 != i && ue.splice(i, 1);
            }
            return this.x = t * (this.nx - this.ox) + this.ox, this.y = t * (this.ny - this.oy) + this.oy, 
            this.size = e * (this.nSize - this.oSize) + this.oSize, e;
        },
        shouldRender: function() {
            return 0 == this.id ? !0 : !(this.x + this.size + 40 < oe - J / 2 / Fe || this.y + this.size + 40 < ae - G / 2 / Fe || this.x - this.size - 40 > oe + J / 2 / Fe || this.y - this.size - 40 > ae + G / 2 / Fe);
        },
        getStrokeColor: function() {
            var t = (~~(.9 * parseInt(this.color.substr(1, 2), 16))).toString(16), e = (~~(.9 * parseInt(this.color.substr(3, 2), 16))).toString(16), i = (~~(.9 * parseInt(this.color.substr(5, 2), 16))).toString(16);
            return 1 == t.length && (t = "0" + t), 1 == e.length && (e = "0" + e), 1 == i.length && (i = "0" + i), 
            "#" + t + e + i;
        },
        drawOneCell: function(t) {
            if (this.shouldRender()) {
                var e = 0 != this.id && !this.isVirus && !this.isAgitated && Ue > Fe;
                if (10 > this.getNumPoints() && (e = !0), this.wasSimpleDrawing && !e) for (var i = 0; i < this.points.length; i++) this.points[i].size = this.size;
                var n = this.size;
                if (!this.wasSimpleDrawing) for (var i = 0; i < this.points.length; i++) n = Math.max(this.points[i].size, n);
                if (this.wasSimpleDrawing = e, t.save(), this.drawTime = xe, i = this.updatePos(), 
                this.destroyed && (t.globalAlpha *= 1 - i), t.lineWidth = 10, t.lineCap = "round", 
                t.lineJoin = this.isVirus ? "miter" : "round", _e ? (t.fillStyle = "#FFFFFF", t.strokeStyle = "#AAAAAA") : (t.fillStyle = this.color, 
                t.strokeStyle = e ? this.getStrokeColor() : this.color), t.beginPath(), e) {
                    var s = .03 * this.size;
                    t.lineWidth = s, t.arc(this.x, this.y, this.size - .5 * s + 5, 0, 2 * Math.PI, !1), 
                    t.stroke();
                } else {
                    this.movePoints(), t.beginPath();
                    var o = this.getNumPoints();
                    for (t.moveTo(this.points[0].x, this.points[0].y), i = 1; o >= i; ++i) {
                        var a = i % o;
                        t.lineTo(this.points[a].x, this.points[a].y);
                    }
                }
                t.closePath();
                var h = this.name.toLowerCase();
                "undefined" != typeof this._skin && "" != this._skin && "%" == this._skin[0] && (h = this._skin.substring(1)), 
                Ie && "" != h && -1 != ai.indexOf(h) ? (oi.hasOwnProperty(h) || (oi[h] = new Image(), 
                oi[h].src = R + h + ".png"), i = 0 != oi[h].width && oi[h].complete ? oi[h] : null) : i = null, 
                e || t.stroke(), t.fill(), i && (t.save(), t.clip(), t.drawImage(i, this.x - n, this.y - n, 2 * n, 2 * n), 
                t.restore()), (_e || 15 < this.size) && !e && (t.strokeStyle = "#000000", t.globalAlpha *= .1, 
                t.stroke()), t.globalAlpha = 1, i = -1 != re.indexOf(this);
                var r;
                if (0 != this.id) {
                    var l = ~~this.x, c = ~~this.y, u = this.getNameSize(), d = .1 * Math.ceil(10 * Fe), f = 1 / d;
                    if ((Ae || i) && this.name && this.nameCache && (null == a || -1 == hi.indexOf(h))) {
                        r = this.nameCache, r.setValue(this.name), r.setSize(u), r.setScale(d);
                        var g = r.render(), m = ~~(g.width * f), v = ~~(g.height * f);
                        t.drawImage(g, l - ~~(.5 * m), c - ~~(.5 * v), m, v), e += .5 * g.height * d + 4;
                    }
                    if (Pe && (i || 0 == re.length && (!this.isVirus || this.isAgitated) && 20 < this.size)) {
                        var m = ~~(this.size * this.size * .01);
                        i = this.sizeCache, i.setValue(m), i.setScale(d), a = i.render(), m = ~~(a.width * f), 
                        v = ~~(a.height * f);
                        var p = this.name ? c + ~~(.7 * v) : c - ~~(.5 * v);
                        t.drawImage(a, l - ~~(.5 * m), p, m, v);
                    }
                }
                t.restore();
            }
        }
    }, B.prototype = {
        _value: "",
        _color: "#000000",
        _stroke: !1,
        _strokeColor: "#000000",
        _size: 16,
        _canvas: null,
        _ctx: null,
        _dirty: !1,
        _scale: 1,
        setSize: function(t) {
            this._size != t && (this._size = t, this._dirty = !0);
        },
        setScale: function(t) {
            this._scale != t && (this._scale = t, this._dirty = !0);
        },
        setStrokeColor: function(t) {
            this._strokeColor != t && (this._strokeColor = t, this._dirty = !0);
        },
        setValue: function(t) {
            t != this._value && (this._value = t, this._dirty = !0);
        },
        render: function() {
            if (null == this._canvas && (this._canvas = document.createElement("canvas"), this._ctx = this._canvas.getContext("2d")), 
            this._dirty) {
                this._dirty = !1;
                var t = this._canvas, e = this._ctx, i = this._value, n = this._scale, s = this._size, o = s + "px Ubuntu";
                e.font = o;
                var a = ~~(.2 * s), h = .1 * s, r = .5 * a;
                t.width = e.measureText(i).width * n + 3, t.height = (s + a) * n, e.font = o, e.globalAlpha = 1, 
                e.lineWidth = h, e.strokeStyle = this._strokeColor, e.fillStyle = this._color, e.scale(n, n), 
                this._stroke && e.strokeText(i, 0, s - r), e.fillText(i, 0, s - r);
            }
            return this._canvas;
        },
        getWidth: function() {
            return W.measureText(this._value).width + 6;
        }
    }, Date.now || (Date.now = function() {
        return new Date().getTime();
    });
    var ri = {
        init: function(t) {
            function e(t, e, i, n, s) {
                this.x = t, this.y = e, this.w = i, this.h = n, this.depth = s, this.items = [], 
                this.nodes = [];
            }
            var i = t.maxChildren || 2, n = t.maxDepth || 4;
            e.prototype = {
                x: 0,
                y: 0,
                w: 0,
                h: 0,
                depth: 0,
                items: null,
                nodes: null,
                exists: function(t) {
                    for (var e = 0; e < this.items.length; ++e) {
                        var i = this.items[e];
                        if (i.x >= t.x && i.y >= t.y && i.x < t.x + t.w && i.y < t.y + t.h) return !0;
                    }
                    if (0 != this.nodes.length) {
                        var n = this;
                        return this.findOverlappingNodes(t, function(e) {
                            return n.nodes[e].exists(t);
                        });
                    }
                    return !1;
                },
                retrieve: function(t, e) {
                    for (var i = 0; i < this.items.length; ++i) e(this.items[i]);
                    if (0 != this.nodes.length) {
                        var n = this;
                        this.findOverlappingNodes(t, function(i) {
                            n.nodes[i].retrieve(t, e);
                        });
                    }
                },
                insert: function(t) {
                    0 != this.nodes.length ? this.nodes[this.findInsertNode(t)].insert(t) : this.items.length >= i && this.depth < n ? (this.devide(), 
                    this.nodes[this.findInsertNode(t)].insert(t)) : this.items.push(t);
                },
                findInsertNode: function(t) {
                    return t.x < this.x + this.w / 2 ? t.y < this.y + this.h / 2 ? 0 : 2 : t.y < this.y + this.h / 2 ? 1 : 3;
                },
                findOverlappingNodes: function(t, e) {
                    return t.x < this.x + this.w / 2 && (t.y < this.y + this.h / 2 && e(0) || t.y >= this.y + this.h / 2 && e(2)) || t.x >= this.x + this.w / 2 && (t.y < this.y + this.h / 2 && e(1) || t.y >= this.y + this.h / 2 && e(3)) ? !0 : !1;
                },
                devide: function() {
                    var t = this.depth + 1, i = this.w / 2, n = this.h / 2;
                    for (this.nodes.push(new e(this.x, this.y, i, n, t)), this.nodes.push(new e(this.x + i, this.y, i, n, t)), 
                    this.nodes.push(new e(this.x, this.y + n, i, n, t)), this.nodes.push(new e(this.x + i, this.y + n, i, n, t)), 
                    t = this.items, this.items = [], i = 0; i < t.length; i++) this.insert(t[i]);
                },
                clear: function() {
                    for (var t = 0; t < this.nodes.length; t++) this.nodes[t].clear();
                    this.items.length = 0, this.nodes.length = 0;
                }
            };
            var s = {
                x: 0,
                y: 0,
                w: 0,
                h: 0
            };
            return {
                root: new e(t.minX, t.minY, t.maxX - t.minX, t.maxY - t.minY, 0),
                insert: function(t) {
                    this.root.insert(t);
                },
                retrieve: function(t, e) {
                    this.root.retrieve(t, e);
                },
                retrieve2: function(t, e, i, n, o) {
                    s.x = t, s.y = e, s.w = i, s.h = n, this.root.retrieve(s, o);
                },
                exists: function(t) {
                    return this.root.exists(t);
                },
                clear: function() {
                    this.root.clear();
                }
            };
        }
    };
    i(function() {
        function t() {
            0 < re.length && (e.color = re[0].color, e.setName(re[0].name)), n.clearRect(0, 0, 32, 32), 
            n.save(), n.translate(16, 16), n.scale(.4, .4), e.drawOneCell(n), n.restore();
            var t = document.getElementById("favicon"), s = t.cloneNode(!0);
            s.setAttribute("href", i.toDataURL("image/png")), t.parentNode.replaceChild(s, t);
        }
        var e = new D(0, 0, 0, 32, "#ED1C24", ""), i = document.createElement("canvas");
        i.width = 32, i.height = 32;
        var n = i.getContext("2d");
        t(), setInterval(b, 1e3);
    }), e.onload = n;
}(window, window.jQuery);

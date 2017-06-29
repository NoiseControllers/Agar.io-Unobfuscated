(function(n, F) {
  function da() {
    x = M = document.getElementById("canvas");
    b = x.getContext("2d");
    x.onmousedown = function(a) {
      G = a.clientX;
      N = a.clientY;
      O();
      V();
    };
    x.onmousemove = function(a) {
      G = a.clientX;
      N = a.clientY;
      O();
    };
    x.onmouseup = function(a) {
    };
    n.onkeydown = function(a) {
      32 == a.keyCode && null != g && g.readyState == g.OPEN && (a = new ArrayBuffer(1), (new DataView(a)).setUint8(0, 17), g.send(a));
    };
    P();
    n.onresize = W;
    W();
    n.requestAnimationFrame ? n.requestAnimationFrame(X) : setInterval(Q, 1E3 / 60);
    setInterval(V, 100);
  }
  function ea() {
    for (var a = Number.POSITIVE_INFINITY, c = Number.POSITIVE_INFINITY, f = Number.NEGATIVE_INFINITY, d = Number.NEGATIVE_INFINITY, b = 0, e = 0; e < l.length; e++) {
      b = Math.max(l[e].size, b), a = Math.min(l[e].x, a), c = Math.min(l[e].y, c), f = Math.max(l[e].x, f), d = Math.max(l[e].y, d);
    }
    H = QUAD.init({minX:a - (b + 100), minY:c - (b + 100), maxX:f + (b + 100), maxY:d + (b + 100)});
    for (e = 0; e < l.length; e++) {
      for (a = l[e], c = 0; c < a.points.length; ++c) {
        H.insert(a.points[c]);
      }
    }
  }
  function O() {
    C = G + r - q / 2;
    I = N + u - t / 2;
  }
  function P() {
    F.ajax("https://web.archive.org/web/20150430132206/http://m.agar.io/", {error:function() {
      setTimeout(P, 1E3);
    }, success:function(a) {
      a = a.split("\n");
      Y("ws://" + a[0]);
    }, dataType:"text", method:"GET", cache:!1});
  }
  function fa() {
    P();
  }
  function Y(a) {
    D = [];
    h = [];
    v = {};
    l = [];
    A = [];
    w = [];
    console.log("Connecting to " + a);
    g = new WebSocket(a);
    g.binaryType = "arraybuffer";
    g.onopen = ga;
    g.onmessage = ha;
    g.onclose = ia;
    g.onerror = function() {
      console.log("socket error");
    };
  }
  function ga(a) {
    F("#connecting").hide();
    console.log("socket open");
    a = new ArrayBuffer(5);
    var c = new DataView(a);
    c.setUint8(0, 255);
    c.setUint32(1, 1, !0);
    g.send(a);
    Z();
  }
  function ia(a) {
    console.log("socket close");
    setTimeout(fa, 500);
  }
  function ha(a) {
    function c() {
      for (var a = "";;) {
        var c = d.getUint16(f, !0);
        f += 2;
        if (0 == c) {
          break;
        }
        a += String.fromCharCode(c);
      }
      return a;
    }
    var f = 1, d = new DataView(a.data);
    switch(d.getUint8(0)) {
      case 16:
        ja(d);
        break;
      case 32:
        D.push(d.getUint32(1, !0));
        break;
      case 48:
        for (w = []; f < d.byteLength;) {
          w.push(c());
        }
        ka();
        break;
      case 64:
        J = d.getFloat64(1, !0), R = d.getFloat64(9, !0), K = d.getFloat64(17, !0), S = d.getFloat64(25, !0), 0 == h.length && (r = (K + J) / 2, u = (S + R) / 2);
    }
  }
  function ja(a) {
    var c;
    B = +new Date;
    var f = Math.random();
    var d = 1;
    var b = a.getUint16(d, !0);
    d += 2;
    for (c = 0; c < b; ++c) {
      var e = v[a.getUint32(d, !0)];
      var k = v[a.getUint32(d + 4, !0)];
      d += 8;
      e && k && (-1 != h.indexOf(k) && 1 == h.length && F("#overlays").fadeIn(3E3), k.destroy(), k.ox = k.x, k.oy = k.y, k.oSize = k.size, k.nx = e.x, k.ny = e.y, k.nSize = 1, k.updateTime = B);
    }
    for (;;) {
      b = a.getUint32(d, !0);
      d += 4;
      if (0 == b) {
        break;
      }
      c = a.getFloat64(d, !0);
      d += 8;
      e = a.getFloat64(d, !0);
      d += 8;
      k = a.getFloat64(d, !0);
      d += 8;
      var g = a.getUint8(d++), T;
      for (T = "";;) {
        var m = a.getUint16(d, !0);
        d += 2;
        if (0 == m) {
          break;
        }
        T += String.fromCharCode(m);
      }
      m = null;
      v.hasOwnProperty(b) ? (m = v[b], m.updatePos(), m.ox = m.x, m.oy = m.y, m.oSize = m.size) : m = new aa(b, c, e, k, g, T);
      m.nx = c;
      m.ny = e;
      m.nSize = k;
      m.updateCode = f;
      m.updateTime = B;
      -1 != D.indexOf(b) && -1 == h.indexOf(m) && (document.getElementById("overlays").style.display = "none", h.push(m), 1 == h.length && (r = m.x, u = m.y));
    }
    a.getUint16(d, !0);
    d += 2;
    e = a.getUint32(d, !0);
    d += 4;
    for (c = 0; c < e; c++) {
      b = a.getUint32(d, !0), d += 4, v[b] && (v[b].updateCode = f);
    }
    for (c = 0; c < l.length; c++) {
      l[c].updateCode != f && l[c--].destroy();
    }
  }
  function V() {
    if (null != g && g.readyState == g.OPEN && (U != C || ba != I)) {
      U = C;
      ba = I;
      var a = new ArrayBuffer(21), c = new DataView(a);
      c.setUint8(0, 16);
      c.setFloat64(1, C, !0);
      c.setFloat64(9, I, !0);
      c.setUint32(17, 0, !0);
      g.send(a);
    }
  }
  function Z() {
    if (null != g && g.readyState == g.OPEN && null != E) {
      var a = new ArrayBuffer(1 + 2 * E.length), c = new DataView(a);
      c.setUint8(0, 0);
      for (var f = 0; f < E.length; ++f) {
        c.setUint16(1 + 2 * f, E.charCodeAt(f), !0);
      }
      g.send(a);
    }
  }
  function X() {
    Q();
    n.requestAnimationFrame(X);
  }
  function W() {
    q = n.innerWidth;
    t = n.innerHeight;
    M.width = x.width = q;
    M.height = x.height = t;
    Q();
  }
  function la() {
    for (var a = 0, c = 0; c < h.length; c++) {
      a += h[c].size;
    }
    a = Math.pow(Math.min(64 / a, 1), .25) * Math.max(t / 965, q / 1920);
    p = (9 * p + a) / 10;
  }
  function Q() {
    var a = +new Date;
    ++ca;
    la();
    B = +new Date;
    ea();
    if (0 < h.length) {
      for (var c = 0, f = 0, d = 0; d < h.length; d++) {
        h[d].updatePos(), c += h[d].x / h.length, f += h[d].y / h.length;
      }
      r = (r + c) / 2;
      u = (u + f) / 2;
    }
    O();
    b.clearRect(0, 0, q, t);
    b.fillStyle = "#F2FBFF";
    b.fillRect(0, 0, q, t);
    b.save();
    b.fillStyle = "#000000";
    b.strokeStyle = "#000000";
    b.globalAlpha = .2;
    b.scale(p, p);
    c = q / p;
    f = t / p;
    for (d = -.5 + (-r + c / 2) % 50; d < c; d += 50) {
      b.beginPath(), b.moveTo(d, 0), b.lineTo(d, f), b.stroke();
    }
    for (d = -.5 + (-u + f / 2) % 50; d < f; d += 50) {
      b.beginPath(), b.moveTo(0, d), b.lineTo(c, d), b.stroke();
    }
    b.restore();
    l.sort(function(a, c) {
      return a.size == c.size ? a.id - c.id : a.size - c.size;
    });
    b.save();
    b.translate(q / 2, t / 2);
    b.scale(p, p);
    b.translate(-r, -u);
    for (d = 0; d < A.length; d++) {
      A[d].draw();
    }
    for (d = 0; d < l.length; d++) {
      l[d].draw();
    }
    b.restore();
    y && 0 != w.length && b.drawImage(y, q - y.width - 10, 10);
    a = +new Date - a;
    a > 1E3 / 60 ? z -= .01 : a < 1E3 / 65 && (z += .01);
    .4 > z && (z = .4);
    1 < z && (z = 1);
  }
  function ka() {
    if (0 != w.length) {
      y = document.createElement("canvas");
      var a = y.getContext("2d"), c = 60 + 24 * w.length;
      y.width = 200;
      y.height = c;
      a.globalAlpha = .4;
      a.fillStyle = "#000000";
      a.fillRect(0, 0, 200, c);
      a.globalAlpha = 1;
      a.fillStyle = "#FFFFFF";
      c = "Scoreboard";
      a.font = "30px Ubuntu";
      a.fillText(c, 100 - a.measureText(c).width / 2, 40);
      a.font = "20px Ubuntu";
      for (var f = 0; f < w.length; ++f) {
        c = f + 1 + ". " + (w[f] || "An unnamed cell"), a.fillText(c, 100 - a.measureText(c).width / 2, 70 + 24 * f);
      }
    }
  }
  function aa(a, c, f, d, b, e) {
    l.push(this);
    v[a] = this;
    this.id = a;
    this.ox = this.x = c;
    this.oy = this.y = f;
    this.oSize = this.size = d;
    if (0 == b) {
      this.isVirus = !0, this.color = "#33FF33";
    } else {
      a = 63487 | b << 16;
      f = (a >> 16 & 255) / 255 * 360;
      b = (a >> 8 & 255) / 255;
      a = (a >> 0 & 255) / 255;
      if (0 == b) {
        a = a << 16 | a << 8 | a << 0;
      } else {
        f /= 60;
        c = ~~f;
        var k = f - c;
        f = a * (1 - b);
        d = a * (1 - b * k);
        b = a * (1 - b * (1 - k));
        var g = k = 0, h = 0;
        switch(c % 6) {
          case 0:
            k = a;
            g = b;
            h = f;
            break;
          case 1:
            k = d;
            g = a;
            h = f;
            break;
          case 2:
            k = f;
            g = a;
            h = b;
            break;
          case 3:
            k = f;
            g = d;
            h = a;
            break;
          case 4:
            k = b;
            g = f;
            h = a;
            break;
          case 5:
            k = a, g = f, h = d;
        }
        a = (~~(255 * k) & 255) << 16 | (~~(255 * g) & 255) << 8 | ~~(255 * h) & 255;
      }
      for (a = a.toString(16); 6 > a.length;) {
        a = "0" + a;
      }
      this.color = "#" + a;
    }
    this.points = [];
    this.pointsAcc = [];
    this.createPoints();
    this.setName(e);
  }
  var U, K, J, ca, C, G, r, H, t, q, x, b, M;
  if ("agar.io" != n.location.hostname && "localhost" != n.location.hostname) {
    n.location = "https://web.archive.org/web/20150430132206/http://agar.io/";
  } else {
    var g = H = null;
    var u = r = 0;
    var D = [];
    var h = [];
    var v = {};
    var l = [];
    var A = [];
    var w = [];
    var N = G = 0;
    var I = C = -1;
    var B = ca = 0;
    var E = null;
    var R = J = 0;
    var S = K = 1E4;
    var p = 1;
    n.setNick = function(a) {
      E = a;
      Z();
      F("#overlays").hide();
    };
    n.connect = Y;
    var ba = U = -1;
    var y = null;
    var z = 1;
    var L = {};
    aa.prototype = {id:0, points:null, pointsAcc:null, name:null, cachedName:null, x:0, y:0, size:0, ox:0, oy:0, oSize:0, nx:0, ny:0, nSize:0, updateTime:0, updateCode:0, drawTime:0, destroyed:!1, isVirus:!1, destroy:function() {
      var a;
      for (a = 0; a < l.length; a++) {
        if (l[a] == this) {
          l.splice(a, 1);
          break;
        }
      }
      delete v[this.id];
      a = h.indexOf(this);
      -1 != a && h.splice(a, 1);
      a = D.indexOf(this.id);
      -1 != a && D.splice(a, 1);
      this.destroyed = !0;
      A.push(this);
    }, getNameSize:function() {
      return Math.max(~~(.3 * this.size), 24);
    }, setName:function(a) {
      if (this.name = a) {
        var c = document.createElement("canvas"), b = c.getContext("2d"), d = this.getNameSize(), g = d - 2 + "px Ubuntu";
        b.font = g;
        var e = b.measureText(a).width;
        c.width = e + 6;
        c.height = d + 10;
        b.font = g;
        b.globalAlpha = 1;
        b.lineWidth = 3;
        b.strokeStyle = "#000000";
        b.fillStyle = "#FFFFFF";
        b.strokeText(a, 3, d - 5);
        b.fillText(a, 3, d - 5);
        this.cachedName = c;
      }
    }, createPoints:function() {
      for (var a = this.getNumPoints(); this.points.length > a;) {
        this.points.splice(~~(Math.random() * this.points.length), 1);
      }
      for (0 == this.points.length && 0 < a && (this.points.push({c:this, v:this.size, x:this.x, y:this.y}), this.pointsAcc.push(Math.random() - .5)); this.points.length < a;) {
        var c = ~~(Math.random() * this.points.length), b = this.points[c];
        this.points.splice(c, 0, {c:this, v:b.v, x:b.x, y:b.y});
        this.pointsAcc.splice(c, 0, this.pointsAcc[c]);
      }
    }, getNumPoints:function() {
      return ~~Math.max(this.size * p * z, this.isVirus ? 10 : 5);
    }, movePoints:function() {
      this.createPoints();
      var a = this.points, c = this.pointsAcc;
      var b = c.concat();
      for (var d = a.concat(), g = d.length, e = 0; e < g; ++e) {
        var k = b[(e - 1 + g) % g];
        var h = b[(e + 1) % g];
        c[e] += Math.random() - .5;
        c[e] *= .7;
        10 < c[e] && (c[e] = 10);
        -10 > c[e] && (c[e] = -10);
        c[e] = (k + h + 8 * c[e]) / 10;
      }
      for (e = 0; e < g; ++e) {
        b = d[e].v;
        k = d[(e - 1 + g) % g].v;
        h = d[(e + 1) % g].v;
        var l = !1, m = this, n = a[e].x, p = a[e].y;
        H.retrieve({x:n - 5, y:p - 5, w:10, h:10}, function(a) {
          a.c != m && 25 > (n - a.x) * (n - a.x) + (p - a.y) * (p - a.y) && (l = !0);
        });
        !l && (a[e].x < J || a[e].y < R || a[e].x > K || a[e].y > S) && (l = !0);
        l && (0 < c[e] && (c[e] = 0), --c[e]);
        b += c[e];
        0 > b && (b = 0);
        b = (9 * b + this.size) / 10;
        a[e].v = (k + h + 8 * b) / 10;
        k = 2 * Math.PI / g;
        h = this.points[e].v;
        this.isVirus && 0 == e % 2 && (h += 5);
        a[e].x = this.x + Math.cos(k * e) * h;
        a[e].y = this.y + Math.sin(k * e) * h;
      }
    }, updatePos:function() {
      var a = (B - this.updateTime) / 120;
      a = 0 > a ? 0 : 1 < a ? 1 : a;
      a = a * a * (3 - 2 * a);
      var b = this.getNameSize();
      if (this.destroyed && 1 <= a) {
        var f = A.indexOf(this);
        -1 != f && A.splice(f, 1);
      }
      this.x = a * (this.nx - this.ox) + this.ox;
      this.y = a * (this.ny - this.oy) + this.oy;
      this.size = a * (this.nSize - this.oSize) + this.oSize;
      this.destroyed || b == this.getNameSize() || this.setName(this.name);
      return a;
    }, draw:function() {
      if (!(this.x + this.size + 20 < r - q / 2 / p || this.y + this.size + 20 < u - t / 2 / p || this.x - this.size - 20 > r + q / 2 / p || this.y - this.size - 20 > u + t / 2 / p)) {
        b.save();
        this.drawTime = B;
        var a = this.updatePos();
        this.destroyed && (b.globalAlpha *= 1 - a);
        this.movePoints();
        b.fillStyle = this.color;
        b.strokeStyle = this.color;
        b.beginPath();
        b.lineWidth = 10;
        b.lineCap = "round";
        b.lineJoin = this.isVirus ? "mitter" : "round";
        for (var a = this.getNumPoints(), c = 0; c <= a; ++c) {
          var f = c % a;
          0 == c ? b.moveTo(this.points[f].x, this.points[f].y) : b.lineTo(this.points[f].x, this.points[f].y);
        }
        b.closePath();
        a = this.name;
        a = a.toLowerCase();
        -1 != "poland;usa;china;russia;canada;australia;spain;brazil;germany;ukraine;france;sweden;north korea;south korea;japan".split(";").indexOf(a) ? (L.hasOwnProperty(a) || (L[a] = new Image, L[a].src = "skins/" + a + ".png"), a = L[a]) : a = null;
        b.stroke();
        null != a && 0 < a.width ? (b.save(), b.clip(), b.drawImage(a, this.x - this.size, this.y - this.size, 2 * this.size, 2 * this.size), b.restore()) : b.fill();
        15 < this.size && (b.strokeStyle = "#000000", b.globalAlpha *= .1, b.stroke());
        this.name && this.cachedName && (b.globalAlpha = 1, b.drawImage(this.cachedName, ~~this.x - ~~(this.cachedName.width / 2), ~~this.y - ~~(this.cachedName.height / 2)));
        b.restore();
      }
    }};
    n.onload = da;
  }
})(window, jQuery);

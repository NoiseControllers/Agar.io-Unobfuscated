(function(g, m) {
  function Ya() {
    da = !0;
    Fa();
    setInterval(Fa, 18E4);
    C = ua = document.getElementById("canvas");
    f = C.getContext("2d");
    C.onmousedown = function(a) {
      if (Ga) {
        var b = a.clientX - (5 + q / 5 / 2), c = a.clientY - (5 + q / 5 / 2);
        if (Math.sqrt(b * b + c * c) <= q / 5 / 2) {
          P();
          D(17);
          return;
        }
      }
      Q = a.clientX;
      ea = a.clientY;
      va();
      P();
    };
    C.onmousemove = function(a) {
      Q = a.clientX;
      ea = a.clientY;
      va();
    };
    C.onmouseup = function() {
    };
    /firefox/i.test(navigator.userAgent) ? document.addEventListener("DOMMouseScroll", Ha, !1) : document.body.onmousewheel = Ha;
    var a = !1, b = !1, c = !1;
    g.onkeydown = function(d) {
      32 != d.keyCode || a || (P(), D(17), a = !0);
      81 != d.keyCode || b || (D(18), b = !0);
      87 != d.keyCode || c || (P(), D(21), c = !0);
      27 == d.keyCode && Ia(!0);
    };
    g.onkeyup = function(d) {
      32 == d.keyCode && (a = !1);
      87 == d.keyCode && (c = !1);
      81 == d.keyCode && b && (D(19), b = !1);
    };
    g.onblur = function() {
      D(19);
      c = b = a = !1;
    };
    g.onresize = Ja;
    g.requestAnimationFrame ? g.requestAnimationFrame(Ka) : setInterval(wa, 1E3 / 60);
    setInterval(P, 40);
    x && m("#region").val(x);
    La();
    fa(m("#region").val());
    null == t && x && ga();
    m("#overlays").show();
    Ja();
  }
  function Ha(a) {
    E *= Math.pow(.9, a.wheelDelta / -120 || a.detail || 0);
    1 > E && (E = 1);
    E > 4 / k && (E = 4 / k);
  }
  function Za() {
    if (.4 > k) {
      J = null;
    } else {
      for (var a = Number.POSITIVE_INFINITY, b = Number.POSITIVE_INFINITY, c = Number.NEGATIVE_INFINITY, d = Number.NEGATIVE_INFINITY, e = 0, l = 0; l < w.length; l++) {
        var h = w[l];
        !h.I() || h.M || 20 >= h.size * k || (e = Math.max(h.size, e), a = Math.min(h.x, a), b = Math.min(h.y, b), c = Math.max(h.x, c), d = Math.max(h.y, d));
      }
      J = $a.ca({X:a - (e + 100), Y:b - (e + 100), fa:c + (e + 100), ga:d + (e + 100), da:2, ea:4});
      for (l = 0; l < w.length; l++) {
        if (h = w[l], h.I() && !(20 >= h.size * k)) {
          for (a = 0; a < h.a.length; ++a) {
            b = h.a[a].x, c = h.a[a].y, b < u - q / 2 / k || c < v - r / 2 / k || b > u + q / 2 / k || c > v + r / 2 / k || J.i(h.a[a]);
          }
        }
      }
    }
  }
  function va() {
    R = (Q - q / 2) / k + u;
    ha = (ea - r / 2) / k + v;
  }
  function Fa() {
    null == ia && (ia = {}, m("#region").children().each(function() {
      var a = m(this), b = a.val();
      b && (ia[b] = a.text());
    }));
    m.get(ja + "//web.archive.org/web/20150625051243/http://m.agar.io/info", function(a) {
      var b = {}, c;
      for (c in a.regions) {
        var d = c.split(":")[0];
        b[d] = b[d] || 0;
        b[d] += a.regions[c].numPlayers;
      }
      for (c in b) {
        m('#region option[value="' + c + '"]').text(ia[c] + " (" + b[c] + " players)");
      }
    }, "json");
  }
  function Ma() {
    m("#adsBottom").hide();
    m("#overlays").hide();
    La();
  }
  function fa(a) {
    a && a != x && (m("#region").val() != a && m("#region").val(a), x = g.localStorage.location = a, m(".region-message").hide(), m(".region-message." + a).show(), m(".btn-needs-server").prop("disabled", !1), da && ga());
  }
  function Ia(a) {
    F = null;
    ab();
    m("#overlays").fadeIn(a ? 200 : 3E3);
    a || m("#adsBottom").fadeIn(3E3);
  }
  function La() {
    m("#region").val() ? g.localStorage.location = m("#region").val() : g.localStorage.location && m("#region").val(g.localStorage.location);
    m("#region").val() ? m("#locationKnown").append(m("#region")) : m("#locationUnknown").append(m("#region"));
  }
  function ab() {
    !ka || 75 <= S || (ka = !1, setTimeout(function() {
      ka = !0;
    }, 6E4 * la), g.googletag.pubads().refresh([g.mainAd]));
  }
  function Na() {
    console.log("Find " + x + T);
    m.ajax(ja + "//web.archive.org/web/20150625051243/http://m.agar.io/", {error:function() {
      setTimeout(Na, 1E3);
    }, success:function(a) {
      a = a.split("\n");
      a[2] && alert(a[2]);
      Oa("ws://" + a[0], a[1]);
    }, dataType:"text", method:"POST", cache:!1, crossDomain:!0, data:(x + T || "?") + "\n154669603"});
  }
  function ga() {
    da && x && (m("#connecting").show(), Na());
  }
  function Oa(a, b) {
    if (t) {
      t.onopen = null;
      t.onmessage = null;
      t.onclose = null;
      try {
        t.close();
      } catch (d) {
      }
      t = null;
    }
    if (bb) {
      var c = a.split(":");
      a = c[0] + "s://web.archive.org/web/20150625051243/http://ip-/" + c[1].replace(/\./g, "-").replace(/\//g, "") + ".tech.agar.io:" + (+c[2] + 2E3);
    }
    G = [];
    n = [];
    A = {};
    w = [];
    K = [];
    B = [];
    y = z = null;
    L = 0;
    xa = !1;
    console.log("Connecting to " + a);
    t = new WebSocket(a);
    t.binaryType = "arraybuffer";
    t.onopen = function() {
      console.log("socket open");
      var a = M(5);
      a.setUint8(0, 254);
      a.setUint32(1, 4, !0);
      N(a);
      a = M(5);
      a.setUint8(0, 255);
      a.setUint32(1, 154669603, !0);
      N(a);
      a = M(1 + b.length);
      a.setUint8(0, 80);
      for (var c = 0; c < b.length; ++c) {
        a.setUint8(c + 1, b.charCodeAt(c));
      }
      N(a);
      Pa();
    };
    t.onmessage = cb;
    t.onclose = db;
    t.onerror = function() {
      console.log("socket error");
    };
  }
  function M(a) {
    return new DataView(new ArrayBuffer(a));
  }
  function N(a) {
    t.send(a.buffer);
  }
  function db() {
    xa && (ya = 500);
    console.log("socket close");
    setTimeout(ga, ya);
    ya *= 2;
  }
  function cb(a) {
    eb(new DataView(a.data));
  }
  function eb(a) {
    function b() {
      for (var b = "";;) {
        var d = a.getUint16(c, !0);
        c += 2;
        if (0 == d) {
          break;
        }
        b += String.fromCharCode(d);
      }
      return b;
    }
    var c = 0;
    240 == a.getUint8(c) && (c += 5);
    switch(a.getUint8(c++)) {
      case 16:
        fb(a, c);
        break;
      case 17:
        U = a.getFloat32(c, !0);
        c += 4;
        V = a.getFloat32(c, !0);
        c += 4;
        W = a.getFloat32(c, !0);
        c += 4;
        break;
      case 20:
        n = [];
        G = [];
        break;
      case 21:
        ma = a.getInt16(c, !0);
        c += 2;
        na = a.getInt16(c, !0);
        c += 2;
        za || (za = !0, X = ma, Y = na);
        break;
      case 32:
        G.push(a.getUint32(c, !0));
        c += 4;
        break;
      case 49:
        if (null != z) {
          break;
        }
        var d = a.getUint32(c, !0);
        c += 4;
        B = [];
        for (var e = 0; e < d; ++e) {
          var l = a.getUint32(c, !0);
          c += 4;
          B.push({id:l, name:b()});
        }
        Qa();
        break;
      case 50:
        z = [];
        d = a.getUint32(c, !0);
        c += 4;
        for (e = 0; e < d; ++e) {
          z.push(a.getFloat32(c, !0)), c += 4;
        }
        Qa();
        break;
      case 64:
        Z = a.getFloat64(c, !0), c += 8, oa = a.getFloat64(c, !0), c += 8, aa = a.getFloat64(c, !0), c += 8, pa = a.getFloat64(c, !0), c += 8, U = (aa + Z) / 2, V = (pa + oa) / 2, W = 1, 0 == n.length && (u = U, v = V, k = W);
    }
  }
  function fb(a, b) {
    H = +new Date;
    xa = !0;
    m("#connecting").hide();
    var c = Math.random();
    Aa = !1;
    var d = a.getUint16(b, !0);
    b += 2;
    for (var e = 0; e < d; ++e) {
      var l = A[a.getUint32(b, !0)];
      var h = A[a.getUint32(b + 4, !0)];
      b += 8;
      l && h && (h.S(), h.p = h.x, h.q = h.y, h.o = h.size, h.D = l.x, h.F = l.y, h.n = h.size, h.L = H);
    }
    for (e = 0;;) {
      d = a.getUint32(b, !0);
      b += 4;
      if (0 == d) {
        break;
      }
      ++e;
      l = a.getInt16(b, !0);
      b += 2;
      h = a.getInt16(b, !0);
      b += 2;
      var f = a.getInt16(b, !0);
      b += 2;
      for (var g = a.getUint8(b++), k = a.getUint8(b++), q = a.getUint8(b++), g = (g << 16 | k << 8 | q).toString(16); 6 > g.length;) {
        g = "0" + g;
      }
      var g = "#" + g, k = a.getUint8(b++), q = !!(k & 1), t = !!(k & 16);
      k & 2 && (b += 4);
      k & 4 && (b += 8);
      k & 8 && (b += 16);
      for (var r, p = "";;) {
        r = a.getUint16(b, !0);
        b += 2;
        if (0 == r) {
          break;
        }
        p += String.fromCharCode(r);
      }
      r = p;
      p = null;
      A.hasOwnProperty(d) ? (p = A[d], p.K(), p.p = p.x, p.q = p.y, p.o = p.size, p.color = g) : (p = new Ra(d, l, h, f, g, r), w.push(p), A[d] = p, p.ka = l, p.la = h);
      p.d = q;
      p.j = t;
      p.D = l;
      p.F = h;
      p.n = f;
      p.ja = c;
      p.L = H;
      p.W = k;
      r && p.Z(r);
      -1 != G.indexOf(d) && -1 == n.indexOf(p) && (document.getElementById("overlays").style.display = "none", n.push(p), 1 == n.length && (u = p.x, v = p.y));
    }
    c = a.getUint32(b, !0);
    b += 4;
    for (e = 0; e < c; e++) {
      d = a.getUint32(b, !0), b += 4, p = A[d], null != p && p.S();
    }
    Aa && 0 == n.length && Ia(!1);
  }
  function P() {
    if (Ba()) {
      var a = Q - q / 2;
      var b = ea - r / 2;
      64 > a * a + b * b || .01 > Math.abs(Ca - R) && .01 > Math.abs(Sa - ha) || (Ca = R, Sa = ha, a = M(21), a.setUint8(0, 16), a.setFloat64(1, R, !0), a.setFloat64(9, ha, !0), a.setUint32(17, 0, !0), N(a));
    }
  }
  function Pa() {
    if (Ba() && null != F) {
      var a = M(1 + 2 * F.length);
      a.setUint8(0, 0);
      for (var b = 0; b < F.length; ++b) {
        a.setUint16(1 + 2 * b, F.charCodeAt(b), !0);
      }
      N(a);
    }
  }
  function Ba() {
    return null != t && t.readyState == t.OPEN;
  }
  function D(a) {
    if (Ba()) {
      var b = M(1);
      b.setUint8(0, a);
      N(b);
    }
  }
  function Ka() {
    wa();
    g.requestAnimationFrame(Ka);
  }
  function Ja() {
    q = g.innerWidth;
    r = g.innerHeight;
    ua.width = C.width = q;
    ua.height = C.height = r;
    var a = m("#helloDialog");
    a.css("transform", "none");
    var b = a.height(), c = g.innerHeight;
    b > c / 1.1 ? a.css("transform", "translate(-50%, -50%) scale(" + c / b / 1.1 + ")") : a.css("transform", "translate(-50%, -50%)");
    wa();
  }
  function gb() {
    if (0 != n.length) {
      for (var a = 0, b = 0; b < n.length; b++) {
        a += n[b].size;
      }
      a = 1 * Math.pow(Math.min(64 / a, 1), .4) * Math.max(r / 1080, q / 1920) * E;
      k = (9 * k + a) / 10;
    }
  }
  function wa() {
    var a, b = Date.now();
    ++Ta;
    H = b;
    if (0 < n.length) {
      gb();
      for (var c = a = 0, d = 0; d < n.length; d++) {
        n[d].K(), a += n[d].x / n.length, c += n[d].y / n.length;
      }
      U = a;
      V = c;
      W = k;
      u = (u + a) / 2;
      v = (v + c) / 2;
    } else {
      u = (29 * u + U) / 30, v = (29 * v + V) / 30, k = (9 * k + 1 * W * Math.max(r / 1080, q / 1920) * E) / 10;
    }
    Za();
    va();
    qa || f.clearRect(0, 0, q, r);
    qa ? (f.fillStyle = ba ? "#111111" : "#F2FBFF", f.globalAlpha = .05, f.fillRect(0, 0, q, r), f.globalAlpha = 1) : hb();
    w.sort(function(a, b) {
      return a.size == b.size ? a.id - b.id : a.size - b.size;
    });
    f.save();
    f.translate(q / 2, r / 2);
    f.scale(k, k);
    f.translate(-u, -v);
    for (d = 0; d < K.length; d++) {
      K[d].T(f);
    }
    for (d = 0; d < w.length; d++) {
      w[d].T(f);
    }
    if (za) {
      X = (3 * X + ma) / 4;
      Y = (3 * Y + na) / 4;
      f.save();
      f.strokeStyle = "#FFAAAA";
      f.lineWidth = 10;
      f.lineCap = "round";
      f.lineJoin = "round";
      f.globalAlpha = .5;
      f.beginPath();
      for (d = 0; d < n.length; d++) {
        f.moveTo(n[d].x, n[d].y), f.lineTo(X, Y);
      }
      f.stroke();
      f.restore();
    }
    f.restore();
    y && y.width && f.drawImage(y, q - y.width - 10, 10);
    L = Math.max(L, ib());
    0 != L && (null == ra && (ra = new sa(24, "#FFFFFF")), ra.u("Score: " + ~~(L / 100)), c = ra.G(), a = c.width, f.globalAlpha = .2, f.fillStyle = "#000000", f.fillRect(10, r - 10 - 24 - 10, a + 10, 34), f.globalAlpha = 1, f.drawImage(c, 15, r - 10 - 24 - 5));
    jb();
    b = Date.now() - b;
    b > 1E3 / 60 ? I -= .01 : b < 1E3 / 65 && (I += .01);
    .4 > I && (I = .4);
    1 < I && (I = 1);
  }
  function hb() {
    f.fillStyle = ba ? "#111111" : "#F2FBFF";
    f.fillRect(0, 0, q, r);
    f.save();
    f.strokeStyle = ba ? "#AAAAAA" : "#000000";
    f.globalAlpha = .2;
    f.scale(k, k);
    for (var a = q / k, b = r / k, c = -.5 + (-u + a / 2) % 50; c < a; c += 50) {
      f.beginPath(), f.moveTo(c, 0), f.lineTo(c, b), f.stroke();
    }
    for (c = -.5 + (-v + b / 2) % 50; c < b; c += 50) {
      f.beginPath(), f.moveTo(0, c), f.lineTo(a, c), f.stroke();
    }
    f.restore();
  }
  function jb() {
    if (Ga && Da.width) {
      var a = q / 5;
      f.drawImage(Da, 5, 5, a, a);
    }
  }
  function ib() {
    for (var a = 0, b = 0; b < n.length; b++) {
      a += n[b].n * n[b].n;
    }
    return a;
  }
  function Qa() {
    y = null;
    if (null != z || 0 != B.length) {
      if (null != z || ta) {
        y = document.createElement("canvas");
        var a = y.getContext("2d"), b = 60, b = null == z ? b + 24 * B.length : b + 180, c = Math.min(200, .3 * q) / 200;
        y.width = 200 * c;
        y.height = b * c;
        a.scale(c, c);
        a.globalAlpha = .4;
        a.fillStyle = "#000000";
        a.fillRect(0, 0, 200, b);
        a.globalAlpha = 1;
        a.fillStyle = "#FFFFFF";
        c = "Leaderboard";
        a.font = "30px Ubuntu";
        a.fillText(c, 100 - a.measureText(c).width / 2, 40);
        if (null == z) {
          for (a.font = "20px Ubuntu", b = 0; b < B.length; ++b) {
            c = B[b].name || "An unnamed cell", ta || (c = "An unnamed cell"), -1 != G.indexOf(B[b].id) ? (n[0].name && (c = n[0].name), a.fillStyle = "#FFAAAA") : a.fillStyle = "#FFFFFF", c = b + 1 + ". " + c, a.fillText(c, 100 - a.measureText(c).width / 2, 70 + 24 * b);
          }
        } else {
          for (b = c = 0; b < z.length; ++b) {
            var d = c + z[b] * Math.PI * 2;
            a.fillStyle = kb[b + 1];
            a.beginPath();
            a.moveTo(100, 140);
            a.arc(100, 140, 80, c, d, !1);
            a.fill();
            c = d;
          }
        }
      }
    }
  }
  function Ra(a, b, c, d, e, l) {
    this.id = a;
    this.p = this.x = b;
    this.q = this.y = c;
    this.o = this.size = d;
    this.color = e;
    this.a = [];
    this.l = [];
    this.R();
    this.Z(l);
  }
  function sa(a, b, c, d) {
    a && (this.r = a);
    b && (this.N = b);
    this.P = !!c;
    d && (this.s = d);
  }
  var Ca, qa, Y, X, na, ma, da, ba, aa, Z, Ta, R, Q, u, J, r, q, C, f, ua, ja = g.location.protocol, bb = "https:" == ja;
  if (g.location.ancestorOrigins && g.location.ancestorOrigins.length && "https://web.archive.org/web/20150625051243/https://apps.facebook.com/" != g.location.ancestorOrigins[0]) {
    g.top.location = "https://web.archive.org/web/20150625051243/http://agar.io/";
  } else {
    var t = J = null;
    var v = u = 0;
    var G = [];
    var n = [];
    var A = {};
    var w = [];
    var K = [];
    var B = [];
    var ea = Q = 0;
    var ha = R = -1;
    var H = Ta = 0;
    var F = null;
    var oa = Z = 0;
    var pa = aa = 1E4;
    var k = 1;
    var x = null;
    var Ua = !0;
    var ta = !0;
    var Ea = !1;
    var Aa = !1;
    var L = 0;
    var Va = ba = !1;
    var U = u = ~~((Z + aa) / 2);
    var V = v = ~~((oa + pa) / 2);
    var W = 1;
    var T = "";
    var z = null;
    var za = da = !1;
    var S = Y = X = na = ma = 0;
    var kb = ["#333333", "#FF3333", "#33FF33", "#3333FF"];
    var xa = qa = !1;
    var E = 1;
    var Ga = "ontouchstart" in g && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    var Da = new Image;
    Da.src = "img/split.png";
    var Wa = document.createElement("canvas");
    if ("undefined" == typeof console || "undefined" == typeof DataView || "undefined" == typeof WebSocket || null == Wa || null == Wa.getContext || null == g.localStorage) {
      alert("You browser does not support this game, we recommend you to use Firefox to play this");
    } else {
      var ia = null;
      g.setNick = function(a) {
        Ma();
        F = a;
        Pa();
        L = 0;
      };
      g.setRegion = fa;
      g.setSkins = function(a) {
        Ua = a;
      };
      g.setNames = function(a) {
        ta = a;
      };
      g.setDarkTheme = function(a) {
        ba = a;
      };
      g.setColors = function(a) {
        Ea = a;
      };
      g.setShowMass = function(a) {
        Va = a;
      };
      g.spectate = function() {
        F = null;
        D(1);
        Ma();
      };
      g.setGameMode = function(a) {
        a != T && (T = a, ga());
      };
      g.setAcid = function(a) {
        qa = a;
      };
      null != g.localStorage && (null == g.localStorage.AB9 && (g.localStorage.AB9 = 0 + ~~(100 * Math.random())), S = +g.localStorage.AB9, g.ABGroup = S);
      m.get(ja + "//web.archive.org/web/20150625051243/http://gc.agar.io/", function(a) {
        var b = a.split(" ");
        a = b[0];
        b = b[1] || "";
        -1 == ["UA"].indexOf(a) && Xa.push("ussr");
        ca.hasOwnProperty(a) && ("string" == typeof ca[a] ? x || fa(ca[a]) : ca[a].hasOwnProperty(b) && (x || fa(ca[a][b])));
      }, "text");
      var ka = !1;
      var la = 0;
      25 > S ? la = 10 : 50 > S && (la = 5);
      setTimeout(function() {
        ka = !0;
      }, Math.max(6E4 * la, 1E4));
      var ca = {AF:"JP-Tokyo", AX:"EU-London", AL:"EU-London", DZ:"EU-London", AS:"SG-Singapore", AD:"EU-London", AO:"EU-London", AI:"US-Atlanta", AG:"US-Atlanta", AR:"BR-Brazil", AM:"JP-Tokyo", AW:"US-Atlanta", AU:"SG-Singapore", AT:"EU-London", AZ:"JP-Tokyo", BS:"US-Atlanta", BH:"JP-Tokyo", BD:"JP-Tokyo", BB:"US-Atlanta", BY:"EU-London", BE:"EU-London", BZ:"US-Atlanta", BJ:"EU-London", BM:"US-Atlanta", BT:"JP-Tokyo", BO:"BR-Brazil", BQ:"US-Atlanta", BA:"EU-London", BW:"EU-London", BR:"BR-Brazil", 
      IO:"JP-Tokyo", VG:"US-Atlanta", BN:"JP-Tokyo", BG:"EU-London", BF:"EU-London", BI:"EU-London", KH:"JP-Tokyo", CM:"EU-London", CA:"US-Atlanta", CV:"EU-London", KY:"US-Atlanta", CF:"EU-London", TD:"EU-London", CL:"BR-Brazil", CN:"CN-China", CX:"JP-Tokyo", CC:"JP-Tokyo", CO:"BR-Brazil", KM:"EU-London", CD:"EU-London", CG:"EU-London", CK:"SG-Singapore", CR:"US-Atlanta", CI:"EU-London", HR:"EU-London", CU:"US-Atlanta", CW:"US-Atlanta", CY:"JP-Tokyo", CZ:"EU-London", DK:"EU-London", DJ:"EU-London", 
      DM:"US-Atlanta", DO:"US-Atlanta", EC:"BR-Brazil", EG:"EU-London", SV:"US-Atlanta", GQ:"EU-London", ER:"EU-London", EE:"EU-London", ET:"EU-London", FO:"EU-London", FK:"BR-Brazil", FJ:"SG-Singapore", FI:"EU-London", FR:"EU-London", GF:"BR-Brazil", PF:"SG-Singapore", GA:"EU-London", GM:"EU-London", GE:"JP-Tokyo", DE:"EU-London", GH:"EU-London", GI:"EU-London", GR:"EU-London", GL:"US-Atlanta", GD:"US-Atlanta", GP:"US-Atlanta", GU:"SG-Singapore", GT:"US-Atlanta", GG:"EU-London", GN:"EU-London", 
      GW:"EU-London", GY:"BR-Brazil", HT:"US-Atlanta", VA:"EU-London", HN:"US-Atlanta", HK:"JP-Tokyo", HU:"EU-London", IS:"EU-London", IN:"JP-Tokyo", ID:"JP-Tokyo", IR:"JP-Tokyo", IQ:"JP-Tokyo", IE:"EU-London", IM:"EU-London", IL:"JP-Tokyo", IT:"EU-London", JM:"US-Atlanta", JP:"JP-Tokyo", JE:"EU-London", JO:"JP-Tokyo", KZ:"JP-Tokyo", KE:"EU-London", KI:"SG-Singapore", KP:"JP-Tokyo", KR:"JP-Tokyo", KW:"JP-Tokyo", KG:"JP-Tokyo", LA:"JP-Tokyo", LV:"EU-London", LB:"JP-Tokyo", LS:"EU-London", LR:"EU-London", 
      LY:"EU-London", LI:"EU-London", LT:"EU-London", LU:"EU-London", MO:"JP-Tokyo", MK:"EU-London", MG:"EU-London", MW:"EU-London", MY:"JP-Tokyo", MV:"JP-Tokyo", ML:"EU-London", MT:"EU-London", MH:"SG-Singapore", MQ:"US-Atlanta", MR:"EU-London", MU:"EU-London", YT:"EU-London", MX:"US-Atlanta", FM:"SG-Singapore", MD:"EU-London", MC:"EU-London", MN:"JP-Tokyo", ME:"EU-London", MS:"US-Atlanta", MA:"EU-London", MZ:"EU-London", MM:"JP-Tokyo", NA:"EU-London", NR:"SG-Singapore", NP:"JP-Tokyo", NL:"EU-London", 
      NC:"SG-Singapore", NZ:"SG-Singapore", NI:"US-Atlanta", NE:"EU-London", NG:"EU-London", NU:"SG-Singapore", NF:"SG-Singapore", MP:"SG-Singapore", NO:"EU-London", OM:"JP-Tokyo", PK:"JP-Tokyo", PW:"SG-Singapore", PS:"JP-Tokyo", PA:"US-Atlanta", PG:"SG-Singapore", PY:"BR-Brazil", PE:"BR-Brazil", PH:"JP-Tokyo", PN:"SG-Singapore", PL:"EU-London", PT:"EU-London", PR:"US-Atlanta", QA:"JP-Tokyo", RE:"EU-London", RO:"EU-London", RU:"RU-Russia", RW:"EU-London", BL:"US-Atlanta", SH:"EU-London", KN:"US-Atlanta", 
      LC:"US-Atlanta", MF:"US-Atlanta", PM:"US-Atlanta", VC:"US-Atlanta", WS:"SG-Singapore", SM:"EU-London", ST:"EU-London", SA:"EU-London", SN:"EU-London", RS:"EU-London", SC:"EU-London", SL:"EU-London", SG:"JP-Tokyo", SX:"US-Atlanta", SK:"EU-London", SI:"EU-London", SB:"SG-Singapore", SO:"EU-London", ZA:"EU-London", SS:"EU-London", ES:"EU-London", LK:"JP-Tokyo", SD:"EU-London", SR:"BR-Brazil", SJ:"EU-London", SZ:"EU-London", SE:"EU-London", CH:"EU-London", SY:"EU-London", TW:"JP-Tokyo", TJ:"JP-Tokyo", 
      TZ:"EU-London", TH:"JP-Tokyo", TL:"JP-Tokyo", TG:"EU-London", TK:"SG-Singapore", TO:"SG-Singapore", TT:"US-Atlanta", TN:"EU-London", TR:"TK-Turkey", TM:"JP-Tokyo", TC:"US-Atlanta", TV:"SG-Singapore", UG:"EU-London", UA:"EU-London", AE:"EU-London", GB:"EU-London", US:{AL:"US-Atlanta", AK:"US-Fremont", AZ:"US-Fremont", AR:"US-Atlanta", CA:"US-Fremont", CO:"US-Fremont", CT:"US-Atlanta", DE:"US-Atlanta", FL:"US-Atlanta", GA:"US-Atlanta", HI:"US-Fremont", ID:"US-Fremont", IL:"US-Atlanta", IN:"US-Atlanta", 
      IA:"US-Atlanta", KS:"US-Atlanta", KY:"US-Atlanta", LA:"US-Atlanta", ME:"US-Atlanta", MD:"US-Atlanta", MA:"US-Atlanta", MI:"US-Atlanta", MN:"US-Fremont", MS:"US-Atlanta", MO:"US-Atlanta", MT:"US-Fremont", NE:"US-Fremont", NV:"US-Fremont", NH:"US-Atlanta", NJ:"US-Atlanta", NM:"US-Fremont", NY:"US-Atlanta", NC:"US-Atlanta", ND:"US-Fremont", OH:"US-Atlanta", OK:"US-Atlanta", OR:"US-Fremont", PA:"US-Atlanta", RI:"US-Atlanta", SC:"US-Atlanta", SD:"US-Fremont", TN:"US-Atlanta", TX:"US-Atlanta", UT:"US-Fremont", 
      VT:"US-Atlanta", VA:"US-Atlanta", WA:"US-Fremont", WV:"US-Atlanta", WI:"US-Atlanta", WY:"US-Fremont", DC:"US-Atlanta", AS:"US-Atlanta", GU:"US-Atlanta", MP:"US-Atlanta", PR:"US-Atlanta", UM:"US-Atlanta", VI:"US-Atlanta"}, UM:"SG-Singapore", VI:"US-Atlanta", UY:"BR-Brazil", UZ:"JP-Tokyo", VU:"SG-Singapore", VE:"BR-Brazil", VN:"JP-Tokyo", WF:"SG-Singapore", EH:"EU-London", YE:"JP-Tokyo", ZM:"EU-London", ZW:"EU-London"};
      g.connect = Oa;
      var ya = 500;
      var Sa = Ca = -1;
      var y = null;
      var I = 1;
      var ra = null;
      var O = {}, Xa = "poland;usa;china;russia;canada;australia;spain;brazil;germany;ukraine;france;sweden;chaplin;north korea;south korea;japan;united kingdom;earth;greece;latvia;lithuania;estonia;finland;norway;cia;maldivas;austria;nigeria;reddit;yaranaika;confederate;9gag;indiana;4chan;italy;bulgaria;tumblr;2ch.hk;hong kong;portugal;jamaica;german empire;mexico;sanik;switzerland;croatia;chile;indonesia;bangladesh;thailand;iran;iraq;peru;moon;botswana;bosnia;netherlands;european union;taiwan;pakistan;hungary;satanist;qing dynasty;matriarchy;patriarchy;feminism;ireland;texas;facepunch;prodota;cambodia;steam;piccolo;ea;india;kc;denmark;quebec;ayy lmao;sealand;bait;tsarist russia;origin;vinesauce;stalin;belgium;luxembourg;stussy;prussia;8ch;argentina;scotland;sir;romania;belarus;wojak;doge;nasa;byzantium;imperial japan;french kingdom;somalia;turkey;mars;pokerface;8;irs;receita federal;facebook".split(";"), 
      lb = ["8", "nasa"], mb = ["m'blob"];
      Ra.prototype = {id:0, a:null, l:null, name:null, k:null, J:null, x:0, y:0, size:0, p:0, q:0, o:0, D:0, F:0, n:0, W:0, L:0, ja:0, ba:0, A:!1, d:!1, j:!1, M:!0, S:function() {
        var a;
        for (a = 0; a < w.length; a++) {
          if (w[a] == this) {
            w.splice(a, 1);
            break;
          }
        }
        delete A[this.id];
        a = n.indexOf(this);
        -1 != a && (Aa = !0, n.splice(a, 1));
        a = G.indexOf(this.id);
        -1 != a && G.splice(a, 1);
        this.A = !0;
        K.push(this);
      }, h:function() {
        return Math.max(~~(.3 * this.size), 24);
      }, Z:function(a) {
        if (this.name = a) {
          null == this.k ? this.k = new sa(this.h(), "#FFFFFF", !0, "#000000") : this.k.H(this.h()), this.k.u(this.name);
        }
      }, R:function() {
        for (var a, b = this.C(); this.a.length > b;) {
          a = ~~(Math.random() * this.a.length), this.a.splice(a, 1), this.l.splice(a, 1);
        }
        for (0 == this.a.length && 0 < b && (this.a.push({Q:this, e:this.size, x:this.x, y:this.y}), this.l.push(Math.random() - .5)); this.a.length < b;) {
          a = ~~(Math.random() * this.a.length);
          var c = this.a[a];
          this.a.splice(a, 0, {Q:this, e:c.e, x:c.x, y:c.y});
          this.l.splice(a, 0, this.l[a]);
        }
      }, C:function() {
        if (0 == this.id) {
          return 16;
        }
        var a = 10;
        20 > this.size && (a = 0);
        this.d && (a = 30);
        var b = this.size;
        this.d || (b *= k);
        b *= I;
        this.W & 32 && (b *= .25);
        return ~~Math.max(b, a);
      }, ha:function() {
        this.R();
        for (var a = this.a, b = this.l, c = a.length, d = 0; d < c; ++d) {
          var e = b[(d - 1 + c) % c];
          var l = b[(d + 1) % c];
          b[d] += (Math.random() - .5) * (this.j ? 3 : 1);
          b[d] *= .7;
          10 < b[d] && (b[d] = 10);
          -10 > b[d] && (b[d] = -10);
          b[d] = (e + l + 8 * b[d]) / 10;
        }
        for (var h = this, g = this.d ? 0 : (this.id / 1E3 + H / 1E4) % (2 * Math.PI), d = 0; d < c; ++d) {
          var f = a[d].e;
          e = a[(d - 1 + c) % c].e;
          l = a[(d + 1) % c].e;
          if (15 < this.size && null != J && 20 < this.size * k && 0 != this.id) {
            var m = !1, n = a[d].x, q = a[d].y;
            J.ia(n - 5, q - 5, 10, 10, function(a) {
              a.Q != h && 25 > (n - a.x) * (n - a.x) + (q - a.y) * (q - a.y) && (m = !0);
            });
            !m && (a[d].x < Z || a[d].y < oa || a[d].x > aa || a[d].y > pa) && (m = !0);
            m && (0 < b[d] && (b[d] = 0), --b[d]);
          }
          f += b[d];
          0 > f && (f = 0);
          f = this.j ? (19 * f + this.size) / 20 : (12 * f + this.size) / 13;
          a[d].e = (e + l + 8 * f) / 10;
          e = 2 * Math.PI / c;
          l = this.a[d].e;
          this.d && 0 == d % 2 && (l += 5);
          a[d].x = this.x + Math.cos(e * d + g) * l;
          a[d].y = this.y + Math.sin(e * d + g) * l;
        }
      }, K:function() {
        if (0 == this.id) {
          return 1;
        }
        var a = (H - this.L) / 120;
        a = 0 > a ? 0 : 1 < a ? 1 : a;
        var b = 0 > a ? 0 : 1 < a ? 1 : a;
        this.h();
        if (this.A && 1 <= b) {
          var c = K.indexOf(this);
          -1 != c && K.splice(c, 1);
        }
        this.x = a * (this.D - this.p) + this.p;
        this.y = a * (this.F - this.q) + this.q;
        this.size = b * (this.n - this.o) + this.o;
        return b;
      }, I:function() {
        return 0 == this.id ? !0 : this.x + this.size + 40 < u - q / 2 / k || this.y + this.size + 40 < v - r / 2 / k || this.x - this.size - 40 > u + q / 2 / k || this.y - this.size - 40 > v + r / 2 / k ? !1 : !0;
      }, T:function(a) {
        if (this.I()) {
          var b = 0 != this.id && !this.d && !this.j && .4 > k;
          5 > this.C() && (b = !0);
          if (this.M && !b) {
            for (var c = 0; c < this.a.length; c++) {
              this.a[c].e = this.size;
            }
          }
          this.M = b;
          a.save();
          this.ba = H;
          c = this.K();
          this.A && (a.globalAlpha *= 1 - c);
          a.lineWidth = 10;
          a.lineCap = "round";
          a.lineJoin = this.d ? "miter" : "round";
          Ea ? (a.fillStyle = "#FFFFFF", a.strokeStyle = "#AAAAAA") : (a.fillStyle = this.color, a.strokeStyle = this.color);
          if (b) {
            a.beginPath(), a.arc(this.x, this.y, this.size + 5, 0, 2 * Math.PI, !1);
          } else {
            this.ha();
            a.beginPath();
            var d = this.C();
            a.moveTo(this.a[0].x, this.a[0].y);
            for (c = 1; c <= d; ++c) {
              var e = c % d;
              a.lineTo(this.a[e].x, this.a[e].y);
            }
          }
          a.closePath();
          d = this.name.toLowerCase();
          !this.j && Ua && ":teams" != T ? -1 != Xa.indexOf(d) ? (O.hasOwnProperty(d) || (O[d] = new Image, O[d].src = "skins/" + d + ".png"), c = 0 != O[d].width && O[d].complete ? O[d] : null) : c = null : c = null;
          c = (e = c) ? -1 != mb.indexOf(d) : !1;
          b || a.stroke();
          a.fill();
          null == e || c || (a.save(), a.clip(), a.drawImage(e, this.x - this.size, this.y - this.size, 2 * this.size, 2 * this.size), a.restore());
          (Ea || 15 < this.size) && !b && (a.strokeStyle = "#000000", a.globalAlpha *= .1, a.stroke());
          a.globalAlpha = 1;
          null != e && c && a.drawImage(e, this.x - 2 * this.size, this.y - 2 * this.size, 4 * this.size, 4 * this.size);
          c = -1 != n.indexOf(this);
          if (0 != this.id) {
            b = ~~this.y;
            if ((ta || c) && this.name && this.k && (null == e || -1 == lb.indexOf(d))) {
              e = this.k;
              e.u(this.name);
              e.H(this.h());
              d = Math.ceil(10 * k) / 10;
              e.$(d);
              e = e.G();
              var l = ~~(e.width / d);
              var h = ~~(e.height / d);
              a.drawImage(e, ~~this.x - ~~(l / 2), b - ~~(h / 2), l, h);
              b += e.height / 2 / d + 4;
            }
            Va && (c || 0 == n.length && (!this.d || this.j) && 20 < this.size) && (null == this.J && (this.J = new sa(this.h() / 2, "#FFFFFF", !0, "#000000")), c = this.J, c.H(this.h() / 2), c.u(~~(this.size * this.size / 100)), d = Math.ceil(10 * k) / 10, c.$(d), e = c.G(), l = ~~(e.width / d), h = ~~(e.height / d), a.drawImage(e, ~~this.x - ~~(l / 2), b - ~~(h / 2), l, h));
          }
          a.restore();
        }
      }};
      sa.prototype = {w:"", N:"#000000", P:!1, s:"#000000", r:16, m:null, O:null, g:!1, v:1, H:function(a) {
        this.r != a && (this.r = a, this.g = !0);
      }, $:function(a) {
        this.v != a && (this.v = a, this.g = !0);
      }, setStrokeColor:function(a) {
        this.s != a && (this.s = a, this.g = !0);
      }, u:function(a) {
        a != this.w && (this.w = a, this.g = !0);
      }, G:function() {
        null == this.m && (this.m = document.createElement("canvas"), this.O = this.m.getContext("2d"));
        if (this.g) {
          this.g = !1;
          var a = this.m, b = this.O, c = this.w, d = this.v, e = this.r, l = e + "px Ubuntu";
          b.font = l;
          var h = ~~(.2 * e);
          a.width = (b.measureText(c).width + 6) * d;
          a.height = (e + h) * d;
          b.font = l;
          b.scale(d, d);
          b.globalAlpha = 1;
          b.lineWidth = 3;
          b.strokeStyle = this.s;
          b.fillStyle = this.N;
          this.P && b.strokeText(c, 3, e - h / 2);
          b.fillText(c, 3, e - h / 2);
        }
        return this.m;
      }};
      Date.now || (Date.now = function() {
        return (new Date).getTime();
      });
      var $a = {ca:function(a) {
        function b(a, b, c, d, e) {
          this.x = a;
          this.y = b;
          this.f = c;
          this.c = d;
          this.depth = e;
          this.items = [];
          this.b = [];
        }
        var c = a.da || 2, d = a.ea || 4;
        b.prototype = {x:0, y:0, f:0, c:0, depth:0, items:null, b:null, B:function(a) {
          for (var b = 0; b < this.items.length; ++b) {
            var c = this.items[b];
            if (c.x >= a.x && c.y >= a.y && c.x < a.x + a.f && c.y < a.y + a.c) {
              return !0;
            }
          }
          if (0 != this.b.length) {
            var d = this;
            return this.V(a, function(b) {
              return d.b[b].B(a);
            });
          }
          return !1;
        }, t:function(a, b) {
          for (var c = 0; c < this.items.length; ++c) {
            b(this.items[c]);
          }
          if (0 != this.b.length) {
            var d = this;
            this.V(a, function(c) {
              d.b[c].t(a, b);
            });
          }
        }, i:function(a) {
          0 != this.b.length ? this.b[this.U(a)].i(a) : this.items.length >= c && this.depth < d ? (this.aa(), this.b[this.U(a)].i(a)) : this.items.push(a);
        }, U:function(a) {
          return a.x < this.x + this.f / 2 ? a.y < this.y + this.c / 2 ? 0 : 2 : a.y < this.y + this.c / 2 ? 1 : 3;
        }, V:function(a, b) {
          return a.x < this.x + this.f / 2 && (a.y < this.y + this.c / 2 && b(0) || a.y >= this.y + this.c / 2 && b(2)) || a.x >= this.x + this.f / 2 && (a.y < this.y + this.c / 2 && b(1) || a.y >= this.y + this.c / 2 && b(3)) ? !0 : !1;
        }, aa:function() {
          var a = this.depth + 1, c = this.f / 2, d = this.c / 2;
          this.b.push(new b(this.x, this.y, c, d, a));
          this.b.push(new b(this.x + c, this.y, c, d, a));
          this.b.push(new b(this.x, this.y + d, c, d, a));
          this.b.push(new b(this.x + c, this.y + d, c, d, a));
          a = this.items;
          this.items = [];
          for (c = 0; c < a.length; c++) {
            this.i(a[c]);
          }
        }, clear:function() {
          for (var a = 0; a < this.b.length; a++) {
            this.b[a].clear();
          }
          this.items.length = 0;
          this.b.length = 0;
        }};
        var e = {x:0, y:0, f:0, c:0};
        return {root:new b(a.X, a.Y, a.fa - a.X, a.ga - a.Y, 0), i:function(a) {
          this.root.i(a);
        }, t:function(a, b) {
          this.root.t(a, b);
        }, ia:function(a, b, c, d, f) {
          e.x = a;
          e.y = b;
          e.f = c;
          e.c = d;
          this.root.t(e, f);
        }, B:function(a) {
          return this.root.B(a);
        }, clear:function() {
          this.root.clear();
        }};
      }};
      g.onload = Ya;
    }
  }
})(window, window.jQuery);

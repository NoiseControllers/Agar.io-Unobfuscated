(function(d, e) {
  function Pb() {
    wa = !0;
    jb();
    setInterval(jb, 18E4);
    M = Na = document.getElementById("canvas");
    f = M.getContext("2d");
    M.onmousedown = function(a) {
      if (kb) {
        var b = a.clientX - (5 + k / 5 / 2), c = a.clientY - (5 + k / 5 / 2);
        if (Math.sqrt(b * b + c * c) <= k / 5 / 2) {
          fa();
          H(17);
          return;
        }
      }
      ga = 1 * a.clientX;
      xa = 1 * a.clientY;
      Oa();
      fa();
    };
    M.onmousemove = function(a) {
      ga = 1 * a.clientX;
      xa = 1 * a.clientY;
      Oa();
    };
    M.onmouseup = function() {
    };
    /firefox/i.test(navigator.userAgent) ? document.addEventListener("DOMMouseScroll", lb, !1) : document.body.onmousewheel = lb;
    var a = !1, b = !1, c = !1;
    d.onkeydown = function(g) {
      32 != g.keyCode || a || (fa(), H(17), a = !0);
      81 != g.keyCode || b || (H(18), b = !0);
      87 != g.keyCode || c || (fa(), H(21), c = !0);
      27 == g.keyCode && ya(300);
    };
    d.onkeyup = function(g) {
      32 == g.keyCode && (a = !1);
      87 == g.keyCode && (c = !1);
      81 == g.keyCode && b && (H(19), b = !1);
    };
    d.onblur = function() {
      H(19);
      c = b = a = !1;
    };
    d.onresize = mb;
    d.requestAnimationFrame(nb);
    setInterval(fa, 40);
    z && e("#region").val(z);
    ob();
    za(e("#region").val());
    0 == Pa && z && N();
    ya(0);
    mb();
    d.location.hash && 6 <= d.location.hash.length && pb(d.location.hash);
  }
  function lb(a) {
    I *= Math.pow(.9, a.wheelDelta / -120 || a.detail || 0);
    1 > I && (I = 1);
    I > 4 / h && (I = 4 / h);
  }
  function Qb() {
    if (.4 > h) {
      Y = null;
    } else {
      for (var a = Number.POSITIVE_INFINITY, b = Number.POSITIVE_INFINITY, c = Number.NEGATIVE_INFINITY, g = Number.NEGATIVE_INFINITY, d = 0; d < w.length; d++) {
        var e = w[d];
        !e.H() || e.L || 20 >= e.size * h || (a = Math.min(e.x - e.size, a), b = Math.min(e.y - e.size, b), c = Math.max(e.x + e.size, c), g = Math.max(e.y + e.size, g));
      }
      Y = Rb.X({ba:a - 10, ca:b - 10, Z:c + 10, $:g + 10, fa:2, ha:4});
      for (d = 0; d < w.length; d++) {
        if (e = w[d], e.H() && !(20 >= e.size * h)) {
          for (a = 0; a < e.a.length; ++a) {
            b = e.a[a].x, c = e.a[a].y, b < t - k / 2 / h || c < v - p / 2 / h || b > t + k / 2 / h || c > v + p / 2 / h || Y.Y(e.a[a]);
          }
        }
      }
    }
  }
  function Oa() {
    ha = (ga - k / 2) / h + t;
    Aa = (xa - p / 2) / h + v;
  }
  function jb() {
    null == Ba && (Ba = {}, e("#region").children().each(function() {
      var a = e(this), b = a.val();
      b && (Ba[b] = a.text());
    }));
    e.get(ia + "info", function(a) {
      var b = {}, c;
      for (c in a.regions) {
        var g = c.split(":")[0];
        b[g] = b[g] || 0;
        b[g] += a.regions[c].numPlayers;
      }
      for (c in b) {
        e('#region option[value="' + c + '"]').text(Ba[c] + " (" + b[c] + " players)");
      }
    }, "json");
  }
  function qb() {
    e("#adsBottom").hide();
    e("#overlays").hide();
    e("#stats").hide();
    e("#mainPanel").hide();
    O = ja = !1;
    ob();
    rb(d.aa.concat(d.ac));
  }
  function za(a) {
    a && a != z && (e("#region").val() != a && e("#region").val(a), z = d.localStorage.location = a, e(".region-message").hide(), e(".region-message." + a).show(), e(".btn-needs-server").prop("disabled", !1), wa && N());
  }
  function ya(a) {
    ja || O || (J = null, Qa || (e("#adsBottom").show(), e("#g300x250").hide(), e("#a300x250").show()), sb(Qa ? d.ac : d.aa), Qa = !1, 1E3 > a && (u = 1), ja = !0, e("#mainPanel").show(), 0 < a ? e("#overlays").fadeIn(a) : e("#overlays").show());
  }
  function ka(a) {
    e("#helloContainer").attr("data-gamemode", a);
    Z = a;
    e("#gamemode").val(a);
  }
  function ob() {
    e("#region").val() ? d.localStorage.location = e("#region").val() : d.localStorage.location && e("#region").val(d.localStorage.location);
    e("#region").val() ? e("#locationKnown").append(e("#region")) : e("#locationUnknown").append(e("#region"));
  }
  function sb(a) {
    d.googletag && d.googletag.cmd.push(function() {
      Ra && (Ra = !1, setTimeout(function() {
        Ra = !0;
      }, 6E4 * Sb), d.googletag && d.googletag.pubads && d.googletag.pubads().refresh && d.googletag.pubads().refresh(a));
    });
  }
  function rb(a) {
    d.googletag && d.googletag.pubads && d.googletag.pubads().clear && d.googletag.pubads().clear(a);
  }
  function la(a) {
    return d.i18n[a] || d.i18n_dict.en[a] || a;
  }
  function tb() {
    var a = ++Pa;
    console.log("Find " + z + Z);
    e.ajax(ia + "findServer", {error:function() {
      setTimeout(tb, 1E3);
    }, success:function(b) {
      a == Pa && (b.alert && alert(b.alert), Sa("ws://" + b.ip, b.token));
    }, dataType:"json", method:"POST", cache:!1, crossDomain:!0, data:(z + Z || "?") + "\n2200049715"});
  }
  function N() {
    wa && z && (e("#connecting").show(), tb());
  }
  function Sa(a, b) {
    if (r) {
      r.onopen = null;
      r.onmessage = null;
      r.onclose = null;
      try {
        r.close();
      } catch (q) {
      }
      r = null;
    }
    Ta.ip && (a = "ws://" + Ta.ip);
    if (null != P) {
      var c = P;
      P = function() {
        c(b);
      };
    }
    if (Tb) {
      var g = a.split(":");
      a = g[0] + "s://web.archive.org/web/20151001053557/http://ip-/" + g[1].replace(/\./g, "-").replace(/\//g, "") + ".tech.agar.io:" + +g[2];
    }
    A = [];
    l = [];
    K = {};
    w = [];
    aa = [];
    x = [];
    B = C = null;
    Q = 0;
    ma = !1;
    console.log("Connecting to " + a);
    r = new WebSocket(a);
    r.binaryType = "arraybuffer";
    r.onopen = function() {
      console.log("socket open");
      var a = R(5);
      a.setUint8(0, 254);
      a.setUint32(1, 5, !0);
      S(a);
      a = R(5);
      a.setUint8(0, 255);
      a.setUint32(1, 2200049715, !0);
      S(a);
      a = R(1 + b.length);
      a.setUint8(0, 80);
      for (var c = 0; c < b.length; ++c) {
        a.setUint8(c + 1, b.charCodeAt(c));
      }
      S(a);
      ub();
    };
    r.onmessage = Ub;
    r.onclose = Vb;
    r.onerror = function() {
      console.log("socket error");
    };
  }
  function R(a) {
    return new DataView(new ArrayBuffer(a));
  }
  function S(a) {
    r.send(a.buffer);
  }
  function Vb() {
    ma && (Ua = 500);
    console.log("socket close");
    setTimeout(N, Ua);
    Ua *= 2;
  }
  function Ub(a) {
    Wb(new DataView(a.data));
  }
  function Wb(a) {
    function b() {
      for (var b = "";;) {
        var g = a.getUint16(c, !0);
        c += 2;
        if (0 == g) {
          break;
        }
        b += String.fromCharCode(g);
      }
      return b;
    }
    var c = 0;
    240 == a.getUint8(c) && (c += 5);
    switch(a.getUint8(c++)) {
      case 16:
        Xb(a, c);
        break;
      case 17:
        na = a.getFloat32(c, !0);
        c += 4;
        oa = a.getFloat32(c, !0);
        c += 4;
        pa = a.getFloat32(c, !0);
        c += 4;
        break;
      case 20:
        l = [];
        A = [];
        break;
      case 21:
        Ca = a.getInt16(c, !0);
        c += 2;
        Da = a.getInt16(c, !0);
        c += 2;
        Va || (Va = !0, qa = Ca, ra = Da);
        break;
      case 32:
        A.push(a.getUint32(c, !0));
        c += 4;
        break;
      case 49:
        if (null != C) {
          break;
        }
        var g = a.getUint32(c, !0);
        c += 4;
        x = [];
        for (var d = 0; d < g; ++d) {
          var e = a.getUint32(c, !0);
          c += 4;
          x.push({id:e, name:b()});
        }
        vb();
        break;
      case 50:
        C = [];
        g = a.getUint32(c, !0);
        c += 4;
        for (d = 0; d < g; ++d) {
          C.push(a.getFloat32(c, !0)), c += 4;
        }
        vb();
        break;
      case 64:
        sa = a.getFloat64(c, !0);
        c += 8;
        Ea = a.getFloat64(c, !0);
        c += 8;
        ta = a.getFloat64(c, !0);
        c += 8;
        Fa = a.getFloat64(c, !0);
        c += 8;
        na = (ta + sa) / 2;
        oa = (Fa + Ea) / 2;
        pa = 1;
        0 == l.length && (t = na, v = oa, h = pa);
        a.byteLength > c && (a.getUint32(c, !0), c += 4, wb = b(), console.log("Server version " + wb));
        break;
      case 81:
        var f = a.getUint32(c, !0);
        c += 4;
        var n = a.getUint32(c, !0);
        c += 4;
        var k = a.getUint32(c, !0);
        c += 4;
        setTimeout(function() {
          ba({d:f, e:n, c:k});
        }, 1200);
    }
  }
  function Xb(a, b) {
    function c() {
      for (var c = "";;) {
        var g = a.getUint16(b, !0);
        b += 2;
        if (0 == g) {
          break;
        }
        c += String.fromCharCode(g);
      }
      return c;
    }
    function g() {
      for (var c = "";;) {
        var g = a.getUint8(b++);
        if (0 == g) {
          break;
        }
        c += String.fromCharCode(g);
      }
      return c;
    }
    xb = E = Date.now();
    ma || (ma = !0, Yb());
    Wa = !1;
    var q = a.getUint16(b, !0);
    b += 2;
    for (var f = 0; f < q; ++f) {
      var D = K[a.getUint32(b, !0)];
      var n = K[a.getUint32(b + 4, !0)];
      b += 8;
      D && n && (n.R(), n.o = n.x, n.p = n.y, n.n = n.size, n.C = D.x, n.D = D.y, n.m = n.size, n.K = E, Zb(D, n));
    }
    for (f = 0;;) {
      q = a.getUint32(b, !0);
      b += 4;
      if (0 == q) {
        break;
      }
      ++f;
      D = a.getInt32(b, !0);
      b += 4;
      n = a.getInt32(b, !0);
      b += 4;
      var h = a.getInt16(b, !0);
      b += 2;
      var m = a.getUint8(b++);
      var L = a.getUint8(b++), T = a.getUint8(b++), L = $b(m << 16 | L << 8 | T), T = a.getUint8(b++), k = !!(T & 1), p = !!(T & 16), r = null;
      T & 2 && (b += 4 + a.getUint32(b, !0));
      T & 4 && (r = g());
      var u = c();
      m = null;
      K.hasOwnProperty(q) ? (m = K[q], m.J(), m.o = m.x, m.p = m.y, m.n = m.size, m.color = L) : (m = new ca(q, D, n, h, L, u), w.push(m), K[q] = m, m.ia = D, m.ja = n);
      m.f = k;
      m.j = p;
      m.C = D;
      m.D = n;
      m.m = h;
      m.K = E;
      m.T = T;
      r && (m.V = r);
      u && m.t(u);
      -1 != A.indexOf(q) && -1 == l.indexOf(m) && (l.push(m), 1 == l.length && (t = m.x, v = m.y, yb(), document.getElementById("overlays").style.display = "none", y = [], Xa = 0, Ya = l[0].color, Za = !0, $a = Date.now(), U = Ga = Ha = 0));
    }
    D = a.getUint32(b, !0);
    b += 4;
    for (f = 0; f < D; f++) {
      q = a.getUint32(b, !0), b += 4, m = K[q], null != m && m.R();
    }
    Wa && 0 == l.length && (ab = Date.now(), Za = !1, ja || O || (zb ? (sb(d.ab), ac(), O = !0, e("#overlays").fadeIn(3E3), e("#stats").show()) : ya(3E3)));
  }
  function Yb() {
    e("#connecting").hide();
    Ab();
    P && (P(), P = null);
    null != bb && clearTimeout(bb);
    bb = setTimeout(function() {
      d.ga && (++Bb, d.ga("set", "dimension2", Bb));
    }, 1E4);
  }
  function fa() {
    if (da()) {
      var a = ga - k / 2, b = xa - p / 2;
      64 > a * a + b * b || .01 > Math.abs(cb - ha) && .01 > Math.abs(Cb - Aa) || (cb = ha, Cb = Aa, a = R(13), a.setUint8(0, 16), a.setInt32(1, ha, !0), a.setInt32(5, Aa, !0), a.setUint32(9, 0, !0), S(a));
    }
  }
  function Ab() {
    if (da() && ma && null != J) {
      var a = R(1 + 2 * J.length);
      a.setUint8(0, 0);
      for (var b = 0; b < J.length; ++b) {
        a.setUint16(1 + 2 * b, J.charCodeAt(b), !0);
      }
      S(a);
      J = null;
    }
  }
  function da() {
    return null != r && r.readyState == r.OPEN;
  }
  function H(a) {
    if (da()) {
      var b = R(1);
      b.setUint8(0, a);
      S(b);
    }
  }
  function ub() {
    if (da() && null != F) {
      var a = R(1 + F.length);
      a.setUint8(0, 81);
      for (var b = 0; b < F.length; ++b) {
        a.setUint8(b + 1, F.charCodeAt(b));
      }
      S(a);
    }
  }
  function mb() {
    k = 1 * d.innerWidth;
    p = 1 * d.innerHeight;
    Na.width = M.width = k;
    Na.height = M.height = p;
    var a = e("#helloContainer");
    a.css("transform", "none");
    var b = a.height(), c = d.innerHeight;
    b > c / 1.1 ? a.css("transform", "translate(-50%, -50%) scale(" + c / b / 1.1 + ")") : a.css("transform", "translate(-50%, -50%)");
    Db();
  }
  function bc() {
    if (0 != l.length) {
      for (var a = 0, b = 0; b < l.length; b++) {
        a += l[b].size;
      }
      a = 1 * Math.pow(Math.min(64 / a, 1), .4) * Math.max(p / 1080, k / 1920) * I;
      h = (9 * h + a) / 10;
    }
  }
  function Db() {
    var a, b = Date.now();
    ++Eb;
    E = b;
    if (0 < l.length) {
      bc();
      for (var c = a = 0, g = 0; g < l.length; g++) {
        l[g].J(), a += l[g].x / l.length, c += l[g].y / l.length;
      }
      na = a;
      oa = c;
      pa = h;
      t = (t + a) / 2;
      v = (v + c) / 2;
    } else {
      t = (29 * t + na) / 30, v = (29 * v + oa) / 30, h = (9 * h + 1 * pa * Math.max(p / 1080, k / 1920) * I) / 10;
    }
    Qb();
    Oa();
    Ia || f.clearRect(0, 0, k, p);
    Ia ? (f.fillStyle = ua ? "#111111" : "#F2FBFF", f.globalAlpha = .05, f.fillRect(0, 0, k, p), f.globalAlpha = 1) : cc();
    w.sort(function(a, b) {
      return a.size == b.size ? a.id - b.id : a.size - b.size;
    });
    f.save();
    f.translate(k / 2, p / 2);
    f.scale(h, h);
    f.translate(-t, -v);
    for (g = 0; g < aa.length; g++) {
      aa[g].s(f);
    }
    for (g = 0; g < w.length; g++) {
      w[g].s(f);
    }
    if (Va) {
      qa = (3 * qa + Ca) / 4;
      ra = (3 * ra + Da) / 4;
      f.save();
      f.strokeStyle = "#FFAAAA";
      f.lineWidth = 10;
      f.lineCap = "round";
      f.lineJoin = "round";
      f.globalAlpha = .5;
      f.beginPath();
      for (g = 0; g < l.length; g++) {
        f.moveTo(l[g].x, l[g].y), f.lineTo(qa, ra);
      }
      f.stroke();
      f.restore();
    }
    f.restore();
    B && B.width && f.drawImage(B, k - B.width - 10, 10);
    Q = Math.max(Q, Fb());
    0 != Q && (null == Ja && (Ja = new Ka(24, "#FFFFFF")), Ja.u(la("score") + ": " + ~~(Q / 100)), c = Ja.F(), a = c.width, f.globalAlpha = .2, f.fillStyle = "#000000", f.fillRect(10, p - 10 - 24 - 10, a + 10, 34), f.globalAlpha = 1, f.drawImage(c, 15, p - 10 - 24 - 5));
    dc();
    b = Date.now() - b;
    b > 1E3 / 60 ? V -= .01 : b < 1E3 / 65 && (V += .01);
    .4 > V && (V = .4);
    1 < V && (V = 1);
    b = E - Gb;
    !da() || ja || O ? (u += b / 2E3, 1 < u && (u = 1)) : (u -= b / 300, 0 > u && (u = 0));
    0 < u ? (f.fillStyle = "#000000", Hb ? (f.globalAlpha = u, f.fillRect(0, 0, k, p), G.complete && G.width && (G.width / G.height < k / p ? (b = k, a = G.height * k / G.width) : (b = G.width * p / G.height, a = p), f.drawImage(G, (k - b) / 2, (p - a) / 2, b, a), f.globalAlpha = .5 * u, f.fillRect(0, 0, k, p))) : (f.globalAlpha = .5 * u, f.fillRect(0, 0, k, p)), f.globalAlpha = 1) : Hb = !1;
    Gb = E;
  }
  function cc() {
    f.fillStyle = ua ? "#111111" : "#F2FBFF";
    f.fillRect(0, 0, k, p);
    f.save();
    f.strokeStyle = ua ? "#AAAAAA" : "#000000";
    f.globalAlpha = .2 * h;
    for (var a = k / h, b = p / h, c = (-t + a / 2) % 50; c < a; c += 50) {
      f.beginPath(), f.moveTo(c * h - .5, 0), f.lineTo(c * h - .5, b * h), f.stroke();
    }
    for (c = (-v + b / 2) % 50; c < b; c += 50) {
      f.beginPath(), f.moveTo(0, c * h - .5), f.lineTo(a * h, c * h - .5), f.stroke();
    }
    f.restore();
  }
  function dc() {
    if (kb && db.width) {
      var a = k / 5;
      f.drawImage(db, 5, 5, a, a);
    }
  }
  function Fb() {
    for (var a = 0, b = 0; b < l.length; b++) {
      a += l[b].m * l[b].m;
    }
    return a;
  }
  function vb() {
    B = null;
    if (null != C || 0 != x.length) {
      if (null != C || La) {
        B = document.createElement("canvas");
        var a = B.getContext("2d"), b = 60, b = null == C ? b + 24 * x.length : b + 180, c = Math.min(200, .3 * k) / 200;
        B.width = 200 * c;
        B.height = b * c;
        a.scale(c, c);
        a.globalAlpha = .4;
        a.fillStyle = "#000000";
        a.fillRect(0, 0, 200, b);
        a.globalAlpha = 1;
        a.fillStyle = "#FFFFFF";
        c = la("leaderboard");
        a.font = "30px Ubuntu";
        a.fillText(c, 100 - a.measureText(c).width / 2, 40);
        if (null == C) {
          for (a.font = "20px Ubuntu", b = 0; b < x.length; ++b) {
            c = x[b].name || la("unnamed_cell"), La || (c = la("unnamed_cell")), -1 != A.indexOf(x[b].id) ? (l[0].name && (c = l[0].name), a.fillStyle = "#FFAAAA") : a.fillStyle = "#FFFFFF", c = b + 1 + ". " + c, a.fillText(c, 100 - a.measureText(c).width / 2, 70 + 24 * b);
          }
        } else {
          for (b = c = 0; b < C.length; ++b) {
            var g = c + C[b] * Math.PI * 2;
            a.fillStyle = ec[b + 1];
            a.beginPath();
            a.moveTo(100, 140);
            a.arc(100, 140, 80, c, g, !1);
            a.fill();
            c = g;
          }
        }
      }
    }
  }
  function eb(a, b, c, g, d) {
    this.P = a;
    this.x = b;
    this.y = c;
    this.g = g;
    this.b = d;
  }
  function ca(a, b, c, g, d, e) {
    this.id = a;
    this.o = this.x = b;
    this.p = this.y = c;
    this.n = this.size = g;
    this.color = d;
    this.a = [];
    this.Q();
    this.t(e);
  }
  function $b(a) {
    for (a = a.toString(16); 6 > a.length;) {
      a = "0" + a;
    }
    return "#" + a;
  }
  function Ka(a, b, c, g) {
    a && (this.q = a);
    b && (this.M = b);
    this.O = !!c;
    g && (this.r = g);
  }
  function fc(a) {
    for (var b = a.length, c, g; 0 < b;) {
      g = Math.floor(Math.random() * b), b--, c = a[b], a[b] = a[g], a[g] = c;
    }
  }
  function ba(a, b) {
    var c = "1" == e("#helloContainer").attr("data-has-account-data");
    e("#helloContainer").attr("data-has-account-data", "1");
    if (null == b && d.localStorage[W]) {
      var g = JSON.parse(d.localStorage[W]);
      g.xp = a.e;
      g.xpNeeded = a.c;
      g.level = a.d;
      d.localStorage[W] = JSON.stringify(g);
    }
    if (c) {
      var q = +e(".agario-exp-bar .progress-bar-text").first().text().split("/")[0];
      c = +e(".agario-exp-bar .progress-bar-text").first().text().split("/")[1].split(" ")[0];
      g = e(".agario-profile-panel .progress-bar-star").first().text();
      if (g != a.d) {
        ba({e:c, c:c, d:g}, function() {
          e(".agario-profile-panel .progress-bar-star").text(a.d);
          e(".agario-exp-bar .progress-bar").css("width", "100%");
          e(".progress-bar-star").addClass("animated tada").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
            e(".progress-bar-star").removeClass("animated tada");
          });
          setTimeout(function() {
            e(".agario-exp-bar .progress-bar-text").text(a.c + "/" + a.c + " XP");
            ba({e:0, c:a.c, d:a.d}, function() {
              ba(a, b);
            });
          }, 1E3);
        });
      } else {
        var f = Date.now(), h = function() {
          var c = (Date.now() - f) / 1E3;
          c = 0 > c ? 0 : 1 < c ? 1 : c;
          c = c * c * (3 - 2 * c);
          e(".agario-exp-bar .progress-bar-text").text(~~(q + (a.e - q) * c) + "/" + a.c + " XP");
          e(".agario-exp-bar .progress-bar").css("width", (88 * (q + (a.e - q) * c) / a.c).toFixed(2) + "%");
          1 > c ? d.requestAnimationFrame(h) : b && b();
        };
        d.requestAnimationFrame(h);
      }
    } else {
      e(".agario-profile-panel .progress-bar-star").text(a.d), e(".agario-exp-bar .progress-bar-text").text(a.e + "/" + a.c + " XP"), e(".agario-exp-bar .progress-bar").css("width", (88 * a.e / a.c).toFixed(2) + "%"), b && b();
    }
  }
  function Ib(a) {
    "string" == typeof a && (a = JSON.parse(a));
    Date.now() + 18E5 > a.expires ? e("#helloContainer").attr("data-logged-in", "0") : (d.localStorage[W] = JSON.stringify(a), F = a.authToken, e(".agario-profile-name").text(a.name), ub(), ba({e:a.xp, c:a.xpNeeded, d:a.level}), e("#helloContainer").attr("data-logged-in", "1"));
  }
  function gc(a) {
    a = a.split("\n");
    Ib({name:a[0], fbid:a[1], authToken:a[2], expires:1E3 * +a[3], level:+a[4], xp:+a[5], xpNeeded:+a[6]});
  }
  function fb(a) {
    if ("connected" == a.status) {
      var b = a.authResponse.accessToken;
      console.log(b);
      d.FB.api("/me/picture?width=180&height=180", function(a) {
        d.localStorage.fbPictureCache = a.data.url;
        e(".agario-profile-picture").attr("src", a.data.url);
      });
      e("#helloContainer").attr("data-logged-in", "1");
      null != F ? e.ajax(ia + "checkToken", {error:function() {
        F = null;
        fb(a);
      }, success:function(a) {
        a = a.split("\n");
        ba({d:+a[0], e:+a[1], c:+a[2]});
      }, dataType:"text", method:"POST", cache:!1, crossDomain:!0, data:F}) : e.ajax(ia + "facebookLogin", {error:function() {
        F = null;
        e("#helloContainer").attr("data-logged-in", "0");
      }, success:gc, dataType:"text", method:"POST", cache:!1, crossDomain:!0, data:b});
    }
  }
  function pb(a) {
    ka(":party");
    e("#helloContainer").attr("data-party-state", "4");
    a = decodeURIComponent(a).replace(/.*#/gim, "");
    gb("#" + d.encodeURIComponent(a));
    e.ajax(ia + "getToken", {error:function() {
      e("#helloContainer").attr("data-party-state", "6");
    }, success:function(b) {
      b = b.split("\n");
      e(".partyToken").val("agar.io/#" + d.encodeURIComponent(a));
      e("#helloContainer").attr("data-party-state", "5");
      ka(":party");
      Sa("ws://" + b[0], a);
    }, dataType:"text", method:"POST", cache:!1, crossDomain:!0, data:a});
  }
  function gb(a) {
    d.history && d.history.replaceState && d.history.replaceState({}, d.document.title, a);
  }
  function Zb(a, b) {
    var c = -1 != A.indexOf(a.id), g = -1 != A.indexOf(b.id), d = 30 > b.size;
    c && d && ++Xa;
    d || !c || g || ++Ga;
  }
  function Jb(a) {
    a = ~~a;
    var b = (a % 60).toString();
    a = (~~(a / 60)).toString();
    2 > b.length && (b = "0" + b);
    return a + ":" + b;
  }
  function hc() {
    if (null == x) {
      return 0;
    }
    for (var a = 0; a < x.length; ++a) {
      if (-1 != A.indexOf(x[a].id)) {
        return a + 1;
      }
    }
    return 0;
  }
  function ac() {
    var a;
    e(".stats-food-eaten").text(Xa);
    e(".stats-time-alive").text(Jb((ab - $a) / 1E3));
    e(".stats-leaderboard-time").text(Jb(Ha));
    e(".stats-highest-mass").text(~~(Q / 100));
    e(".stats-cells-eaten").text(Ga);
    e(".stats-top-position").text(0 == U ? ":(" : U);
    if (a = document.getElementById("statsGraph")) {
      var b = a.getContext("2d"), c = a.width;
      a = a.height;
      b.clearRect(0, 0, c, a);
      if (2 < y.length) {
        for (var g = 200, d = 0; d < y.length; d++) {
          g = Math.max(y[d], g);
        }
        b.lineWidth = 3;
        b.lineCap = "round";
        b.lineJoin = "round";
        b.strokeStyle = Ya;
        b.fillStyle = Ya;
        b.beginPath();
        b.moveTo(0, a - y[0] / g * (a - 10) + 10);
        for (d = 1; d < y.length; d += Math.max(~~(y.length / c), 1)) {
          for (var f = d / (y.length - 1) * c, h = [], n = -20; 20 >= n; ++n) {
            0 > d + n || d + n >= y.length || h.push(y[d + n]);
          }
          h = h.reduce(function(a, b) {
            return a + b;
          }) / h.length / g;
          b.lineTo(f, a - h * (a - 10) + 10);
        }
        b.stroke();
        b.globalAlpha = .5;
        b.lineTo(c, a);
        b.lineTo(0, a);
        b.fill();
        b.globalAlpha = 1;
      }
    }
  }
  var Ga, Ha, ab, $a, O, cb, I, Ia, ra, qa, Da, Ca, wa, ua, ta, sa, E, Eb, ha, ga, t, Y, p, k, M, f, Na;
  if (!d.agarioNoInit) {
    var hb = d.location.protocol;
    var Tb = "https:" == hb;
    var ia = hb + "//web.archive.org/web/20151001053557/http://m.agar.io/";
    var Ma = d.navigator.userAgent;
    if (-1 != Ma.indexOf("Android")) {
      d.ga && d.ga("send", "event", "MobileRedirect", "PlayStore"), setTimeout(function() {
        d.location.href = "https://web.archive.org/web/20151001053557/https://play.google.com/store/apps/details?id=com.miniclip.agar.io";
      }, 1E3);
    } else {
      if (-1 != Ma.indexOf("iPhone") || -1 != Ma.indexOf("iPad") || -1 != Ma.indexOf("iPod")) {
        d.ga && d.ga("send", "event", "MobileRedirect", "AppStore"), setTimeout(function() {
          d.location.href = "https://web.archive.org/web/20151001053557/https://itunes.apple.com/app/agar.io/id995999703?mt=8&at=1l3vajp";
        }, 1E3);
      } else {
        var r = Y = null;
        var v = t = 0;
        var A = [];
        var l = [];
        var K = {};
        var w = [];
        var aa = [];
        var x = [];
        var xa = ga = 0;
        var Aa = ha = -1;
        var Gb = E = Eb = 0;
        var J = null;
        var Ea = sa = 0;
        var Fa = ta = 1E4;
        var h = 1;
        var z = null;
        var Kb = !0;
        var La = !0;
        var ib = !1;
        var Wa = !1;
        var Q = 0;
        var Lb = ua = !1;
        var na = t = ~~((sa + ta) / 2);
        var oa = v = ~~((Ea + Fa) / 2);
        var pa = 1;
        var Z = "";
        var C = null;
        var Va = wa = !1;
        var Mb = ra = qa = Da = Ca = 0;
        var ec = ["#333333", "#FF3333", "#33FF33", "#3333FF"];
        var ma = Ia = !1;
        var xb = 0;
        var F = null;
        var u = I = 1;
        var ja = !1;
        var Pa = 0;
        var Hb = !0;
        var Ta = {};
        var wb = null;
        (function() {
          var a = d.location.search;
          "?" == a.charAt(0) && (a = a.slice(1));
          for (var a = a.split("&"), b = 0; b < a.length; b++) {
            var c = a[b].split("=");
            Ta[c[0]] = c[1];
          }
        })();
        var G = new Image;
        G.src = "img/background.png";
        var kb = "ontouchstart" in d && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(d.navigator.userAgent);
        var db = new Image;
        db.src = "img/split.png";
        var Nb = document.createElement("canvas");
        if ("undefined" == typeof console || "undefined" == typeof DataView || "undefined" == typeof WebSocket || null == Nb || null == Nb.getContext || null == d.localStorage) {
          alert("You browser does not support this game, we recommend you to use Firefox to play this");
        } else {
          var Ba = null;
          d.setNick = function(a) {
            d.ga && d.ga("send", "event", "Nick", a.toLowerCase());
            qb();
            J = a;
            Ab();
            Q = 0;
          };
          d.setRegion = za;
          var Qa = !0;
          d.setSkins = function(a) {
            Kb = a;
          };
          d.setNames = function(a) {
            La = a;
          };
          d.setDarkTheme = function(a) {
            ua = a;
          };
          d.setColors = function(a) {
            ib = a;
          };
          d.setShowMass = function(a) {
            Lb = a;
          };
          d.spectate = function() {
            J = null;
            H(1);
            qb();
          };
          d.setGameMode = function(a) {
            a != Z && (":party" == Z && e("#helloContainer").attr("data-party-state", "0"), ka(a), ":party" != a && N());
          };
          d.setAcid = function(a) {
            Ia = a;
          };
          null != d.localStorage && (null == d.localStorage.AB9 && (d.localStorage.AB9 = 0 + ~~(100 * Math.random())), Mb = +d.localStorage.AB9, d.ABGroup = Mb);
          e.get(hb + "//web.archive.org/web/20151001053557/http://gc.agar.io/", function(a) {
            var b = a.split(" ");
            a = b[0];
            b = b[1] || "";
            -1 == ["UA"].indexOf(a) && Ob.push("ussr");
            va.hasOwnProperty(a) && ("string" == typeof va[a] ? z || za(va[a]) : va[a].hasOwnProperty(b) && (z || za(va[a][b])));
          }, "text");
          var Ra = !0;
          var Sb = 0;
          var va = {AF:"JP-Tokyo", AX:"EU-London", AL:"EU-London", DZ:"EU-London", AS:"SG-Singapore", AD:"EU-London", AO:"EU-London", AI:"US-Atlanta", AG:"US-Atlanta", AR:"BR-Brazil", AM:"JP-Tokyo", AW:"US-Atlanta", AU:"SG-Singapore", AT:"EU-London", AZ:"JP-Tokyo", BS:"US-Atlanta", BH:"JP-Tokyo", BD:"JP-Tokyo", BB:"US-Atlanta", BY:"EU-London", BE:"EU-London", BZ:"US-Atlanta", BJ:"EU-London", BM:"US-Atlanta", BT:"JP-Tokyo", BO:"BR-Brazil", BQ:"US-Atlanta", BA:"EU-London", BW:"EU-London", BR:"BR-Brazil", 
          IO:"JP-Tokyo", VG:"US-Atlanta", BN:"JP-Tokyo", BG:"EU-London", BF:"EU-London", BI:"EU-London", KH:"JP-Tokyo", CM:"EU-London", CA:"US-Atlanta", CV:"EU-London", KY:"US-Atlanta", CF:"EU-London", TD:"EU-London", CL:"BR-Brazil", CN:"CN-China", CX:"JP-Tokyo", CC:"JP-Tokyo", CO:"BR-Brazil", KM:"EU-London", CD:"EU-London", CG:"EU-London", CK:"SG-Singapore", CR:"US-Atlanta", CI:"EU-London", HR:"EU-London", CU:"US-Atlanta", CW:"US-Atlanta", CY:"JP-Tokyo", CZ:"EU-London", DK:"EU-London", DJ:"EU-London", 
          DM:"US-Atlanta", DO:"US-Atlanta", EC:"BR-Brazil", EG:"EU-London", SV:"US-Atlanta", GQ:"EU-London", ER:"EU-London", EE:"EU-London", ET:"EU-London", FO:"EU-London", FK:"BR-Brazil", FJ:"SG-Singapore", FI:"EU-London", FR:"EU-London", GF:"BR-Brazil", PF:"SG-Singapore", GA:"EU-London", GM:"EU-London", GE:"JP-Tokyo", DE:"EU-London", GH:"EU-London", GI:"EU-London", GR:"EU-London", GL:"US-Atlanta", GD:"US-Atlanta", GP:"US-Atlanta", GU:"SG-Singapore", GT:"US-Atlanta", GG:"EU-London", GN:"EU-London", 
          GW:"EU-London", GY:"BR-Brazil", HT:"US-Atlanta", VA:"EU-London", HN:"US-Atlanta", HK:"JP-Tokyo", HU:"EU-London", IS:"EU-London", IN:"JP-Tokyo", ID:"JP-Tokyo", IR:"JP-Tokyo", IQ:"JP-Tokyo", IE:"EU-London", IM:"EU-London", IL:"JP-Tokyo", IT:"EU-London", JM:"US-Atlanta", JP:"JP-Tokyo", JE:"EU-London", JO:"JP-Tokyo", KZ:"JP-Tokyo", KE:"EU-London", KI:"SG-Singapore", KP:"JP-Tokyo", KR:"JP-Tokyo", KW:"JP-Tokyo", KG:"JP-Tokyo", LA:"JP-Tokyo", LV:"EU-London", LB:"JP-Tokyo", LS:"EU-London", LR:"EU-London", 
          LY:"EU-London", LI:"EU-London", LT:"EU-London", LU:"EU-London", MO:"JP-Tokyo", MK:"EU-London", MG:"EU-London", MW:"EU-London", MY:"JP-Tokyo", MV:"JP-Tokyo", ML:"EU-London", MT:"EU-London", MH:"SG-Singapore", MQ:"US-Atlanta", MR:"EU-London", MU:"EU-London", YT:"EU-London", MX:"US-Atlanta", FM:"SG-Singapore", MD:"EU-London", MC:"EU-London", MN:"JP-Tokyo", ME:"EU-London", MS:"US-Atlanta", MA:"EU-London", MZ:"EU-London", MM:"JP-Tokyo", NA:"EU-London", NR:"SG-Singapore", NP:"JP-Tokyo", NL:"EU-London", 
          NC:"SG-Singapore", NZ:"SG-Singapore", NI:"US-Atlanta", NE:"EU-London", NG:"EU-London", NU:"SG-Singapore", NF:"SG-Singapore", MP:"SG-Singapore", NO:"EU-London", OM:"JP-Tokyo", PK:"JP-Tokyo", PW:"SG-Singapore", PS:"JP-Tokyo", PA:"US-Atlanta", PG:"SG-Singapore", PY:"BR-Brazil", PE:"BR-Brazil", PH:"JP-Tokyo", PN:"SG-Singapore", PL:"EU-London", PT:"EU-London", PR:"US-Atlanta", QA:"JP-Tokyo", RE:"EU-London", RO:"EU-London", RU:"RU-Russia", RW:"EU-London", BL:"US-Atlanta", SH:"EU-London", KN:"US-Atlanta", 
          LC:"US-Atlanta", MF:"US-Atlanta", PM:"US-Atlanta", VC:"US-Atlanta", WS:"SG-Singapore", SM:"EU-London", ST:"EU-London", SA:"EU-London", SN:"EU-London", RS:"EU-London", SC:"EU-London", SL:"EU-London", SG:"JP-Tokyo", SX:"US-Atlanta", SK:"EU-London", SI:"EU-London", SB:"SG-Singapore", SO:"EU-London", ZA:"EU-London", SS:"EU-London", ES:"EU-London", LK:"JP-Tokyo", SD:"EU-London", SR:"BR-Brazil", SJ:"EU-London", SZ:"EU-London", SE:"EU-London", CH:"EU-London", SY:"EU-London", TW:"JP-Tokyo", TJ:"JP-Tokyo", 
          TZ:"EU-London", TH:"JP-Tokyo", TL:"JP-Tokyo", TG:"EU-London", TK:"SG-Singapore", TO:"SG-Singapore", TT:"US-Atlanta", TN:"EU-London", TR:"TK-Turkey", TM:"JP-Tokyo", TC:"US-Atlanta", TV:"SG-Singapore", UG:"EU-London", UA:"EU-London", AE:"EU-London", GB:"EU-London", US:"US-Atlanta", UM:"SG-Singapore", VI:"US-Atlanta", UY:"BR-Brazil", UZ:"JP-Tokyo", VU:"SG-Singapore", VE:"BR-Brazil", VN:"JP-Tokyo", WF:"SG-Singapore", EH:"EU-London", YE:"JP-Tokyo", ZM:"EU-London", ZW:"EU-London"};
          var P = null;
          d.connect = Sa;
          var Ua = 500;
          var bb = null;
          var Bb = 0;
          var Cb = cb = -1;
          d.refreshPlayerInfo = function() {
            H(253);
          };
          var B = null;
          var V = 1;
          var Ja = null;
          var nb = function() {
            var a = Date.now(), b = 1E3 / 60;
            return function() {
              d.requestAnimationFrame(nb);
              var c = Date.now(), g = c - a;
              g > b && (a = c - g % b, !da() || 240 > Date.now() - xb ? Db() : console.warn("Skipping draw"), ic());
            };
          }();
          var ea = {}, Ob = "poland;usa;china;russia;canada;australia;spain;brazil;germany;ukraine;france;sweden;chaplin;north korea;south korea;japan;united kingdom;earth;greece;latvia;lithuania;estonia;finland;norway;cia;maldivas;austria;nigeria;reddit;yaranaika;confederate;9gag;indiana;4chan;italy;bulgaria;tumblr;2ch.hk;hong kong;portugal;jamaica;german empire;mexico;sanik;switzerland;croatia;chile;indonesia;bangladesh;thailand;iran;iraq;peru;moon;botswana;bosnia;netherlands;european union;taiwan;pakistan;hungary;satanist;qing dynasty;matriarchy;patriarchy;feminism;ireland;texas;facepunch;prodota;cambodia;steam;piccolo;ea;india;kc;denmark;quebec;ayy lmao;sealand;bait;tsarist russia;origin;vinesauce;stalin;belgium;luxembourg;stussy;prussia;8ch;argentina;scotland;sir;romania;belarus;wojak;doge;nasa;byzantium;imperial japan;french kingdom;somalia;turkey;mars;pokerface;8;irs;receita federal;facebook;putin;merkel;tsipras;obama;kim jong-un;dilma;hollande;berlusconi;cameron;clinton;hillary;venezuela;blatter;chavez;cuba;fidel;merkel;palin;queen;boris;bush;trump".split(";"), 
          jc = "8;nasa;putin;merkel;tsipras;obama;kim jong-un;dilma;hollande;berlusconi;cameron;clinton;hillary;blatter;chavez;fidel;merkel;palin;queen;boris;bush;trump".split(";"), X = {};
          eb.prototype = {P:null, x:0, y:0, g:0, b:0};
          ca.prototype = {id:0, a:null, name:null, k:null, I:null, x:0, y:0, size:0, o:0, p:0, n:0, C:0, D:0, m:0, T:0, K:0, W:0, A:!1, f:!1, j:!1, L:!0, S:0, V:null, R:function() {
            var a;
            for (a = 0; a < w.length; a++) {
              if (w[a] == this) {
                w.splice(a, 1);
                break;
              }
            }
            delete K[this.id];
            a = l.indexOf(this);
            -1 != a && (Wa = !0, l.splice(a, 1));
            a = A.indexOf(this.id);
            -1 != a && A.splice(a, 1);
            this.A = !0;
            0 < this.S && aa.push(this);
          }, i:function() {
            return Math.max(~~(.3 * this.size), 24);
          }, t:function(a) {
            if (this.name = a) {
              null == this.k ? this.k = new Ka(this.i(), "#FFFFFF", !0, "#000000") : this.k.G(this.i()), this.k.u(this.name);
            }
          }, Q:function() {
            for (var a, b = this.B(); this.a.length > b;) {
              a = ~~(Math.random() * this.a.length), this.a.splice(a, 1);
            }
            for (0 == this.a.length && 0 < b && this.a.push(new eb(this, this.x, this.y, this.size, Math.random() - .5)); this.a.length < b;) {
              a = ~~(Math.random() * this.a.length), a = this.a[a], this.a.push(new eb(this, a.x, a.y, a.g, a.b));
            }
          }, B:function() {
            var a = 10;
            20 > this.size && (a = 0);
            this.f && (a = 30);
            var b = this.size;
            this.f || (b *= h);
            b *= V;
            this.T & 32 && (b *= .25);
            return ~~Math.max(b, a);
          }, da:function() {
            this.Q();
            for (var a = this.a, b = a.length, c = 0; c < b; ++c) {
              var d = a[(c - 1 + b) % b].b;
              var e = a[(c + 1) % b].b;
              a[c].b += (Math.random() - .5) * (this.j ? 3 : 1);
              a[c].b *= .7;
              10 < a[c].b && (a[c].b = 10);
              -10 > a[c].b && (a[c].b = -10);
              a[c].b = (d + e + 8 * a[c].b) / 10;
            }
            for (var f = this, l = this.f ? 0 : (this.id / 1E3 + E / 1E4) % (2 * Math.PI), c = 0; c < b; ++c) {
              var n = a[c].g;
              d = a[(c - 1 + b) % b].g;
              e = a[(c + 1) % b].g;
              if (15 < this.size && null != Y && 20 < this.size * h && 0 < this.id) {
                var k = !1, m = a[c].x, L = a[c].y;
                Y.ea(m - 5, L - 5, 10, 10, function(a) {
                  a.P != f && 25 > (m - a.x) * (m - a.x) + (L - a.y) * (L - a.y) && (k = !0);
                });
                !k && (a[c].x < sa || a[c].y < Ea || a[c].x > ta || a[c].y > Fa) && (k = !0);
                k && (0 < a[c].b && (a[c].b = 0), --a[c].b);
              }
              n += a[c].b;
              0 > n && (n = 0);
              n = this.j ? (19 * n + this.size) / 20 : (12 * n + this.size) / 13;
              a[c].g = (d + e + 8 * n) / 10;
              d = 2 * Math.PI / b;
              e = this.a[c].g;
              this.f && 0 == c % 2 && (e += 5);
              a[c].x = this.x + Math.cos(d * c + l) * e;
              a[c].y = this.y + Math.sin(d * c + l) * e;
            }
          }, J:function() {
            if (0 >= this.id) {
              return 1;
            }
            var a = (E - this.K) / 120;
            a = 0 > a ? 0 : 1 < a ? 1 : a;
            var b = 0 > a ? 0 : 1 < a ? 1 : a;
            this.i();
            if (this.A && 1 <= b) {
              var c = aa.indexOf(this);
              -1 != c && aa.splice(c, 1);
            }
            this.x = a * (this.C - this.o) + this.o;
            this.y = a * (this.D - this.p) + this.p;
            this.size = b * (this.m - this.n) + this.n;
            return b;
          }, H:function() {
            return 0 >= this.id ? !0 : this.x + this.size + 40 < t - k / 2 / h || this.y + this.size + 40 < v - p / 2 / h || this.x - this.size - 40 > t + k / 2 / h || this.y - this.size - 40 > v + p / 2 / h ? !1 : !0;
          }, s:function(a) {
            if (this.H()) {
              ++this.S;
              var b = 0 < this.id && !this.f && !this.j && .4 > h;
              5 > this.B() && 0 < this.id && (b = !0);
              if (this.L && !b) {
                for (var c = 0; c < this.a.length; c++) {
                  this.a[c].g = this.size;
                }
              }
              this.L = b;
              a.save();
              this.W = E;
              c = this.J();
              this.A && (a.globalAlpha *= 1 - c);
              a.lineWidth = 10;
              a.lineCap = "round";
              a.lineJoin = this.f ? "miter" : "round";
              ib ? (a.fillStyle = "#FFFFFF", a.strokeStyle = "#AAAAAA") : (a.fillStyle = this.color, a.strokeStyle = this.color);
              if (b) {
                a.beginPath(), a.arc(this.x, this.y, this.size + 5, 0, 2 * Math.PI, !1);
              } else {
                this.da();
                a.beginPath();
                var d = this.B();
                a.moveTo(this.a[0].x, this.a[0].y);
                for (c = 1; c <= d; ++c) {
                  var e = c % d;
                  a.lineTo(this.a[e].x, this.a[e].y);
                }
              }
              a.closePath();
              c = this.name.toLowerCase();
              !this.j && Kb && ":teams" != Z ? (d = this.V, null == d || 0 == d.length ? d = null : (X.hasOwnProperty(d) || (X[d] = new Image, ":" == d[0] ? X[d].src = d.slice(1) : "%" == d[0] && (X[d].src = "skins/" + d.slice(1) + ".png")), d = 0 != X[d].width && X[d].complete ? X[d] : null), d || (-1 != Ob.indexOf(c) ? (ea.hasOwnProperty(c) || (ea[c] = new Image, ea[c].src = "skins/" + c + ".png"), d = 0 != ea[c].width && ea[c].complete ? ea[c] : null) : d = null)) : d = null;
              e = d;
              b || a.stroke();
              a.fill();
              null != e && (a.save(), a.clip(), a.drawImage(e, this.x - this.size, this.y - this.size, 2 * this.size, 2 * this.size), a.restore());
              (ib || 15 < this.size) && !b && (a.strokeStyle = "#000000", a.globalAlpha *= .1, a.stroke());
              a.globalAlpha = 1;
              d = -1 != l.indexOf(this);
              b = ~~this.y;
              if (0 != this.id && (La || d) && this.name && this.k && (null == e || -1 == jc.indexOf(c))) {
                e = this.k;
                e.u(this.name);
                e.G(this.i());
                c = 0 >= this.id ? 1 : Math.ceil(10 * h) / 10;
                e.U(c);
                e = e.F();
                var f = ~~(e.width / c);
                var k = ~~(e.height / c);
                a.drawImage(e, ~~this.x - ~~(f / 2), b - ~~(k / 2), f, k);
                b += e.height / 2 / c + 4;
              }
              0 < this.id && Lb && (d || 0 == l.length && (!this.f || this.j) && 20 < this.size) && (null == this.I && (this.I = new Ka(this.i() / 2, "#FFFFFF", !0, "#000000")), d = this.I, d.G(this.i() / 2), d.u(~~(this.size * this.size / 100)), c = Math.ceil(10 * h) / 10, d.U(c), e = d.F(), f = ~~(e.width / c), k = ~~(e.height / c), a.drawImage(e, ~~this.x - ~~(f / 2), b - ~~(k / 2), f, k));
              a.restore();
            }
          }};
          Ka.prototype = {w:"", M:"#000000", O:!1, r:"#000000", q:16, l:null, N:null, h:!1, v:1, G:function(a) {
            this.q != a && (this.q = a, this.h = !0);
          }, U:function(a) {
            this.v != a && (this.v = a, this.h = !0);
          }, setStrokeColor:function(a) {
            this.r != a && (this.r = a, this.h = !0);
          }, u:function(a) {
            a != this.w && (this.w = a, this.h = !0);
          }, F:function() {
            null == this.l && (this.l = document.createElement("canvas"), this.N = this.l.getContext("2d"));
            if (this.h) {
              this.h = !1;
              var a = this.l, b = this.N, c = this.w, d = this.v, e = this.q, f = e + "px Ubuntu";
              b.font = f;
              var h = ~~(.2 * e);
              a.width = (b.measureText(c).width + 6) * d;
              a.height = (e + h) * d;
              b.font = f;
              b.scale(d, d);
              b.globalAlpha = 1;
              b.lineWidth = 3;
              b.strokeStyle = this.r;
              b.fillStyle = this.M;
              this.O && b.strokeText(c, 3, e - h / 2);
              b.fillText(c, 3, e - h / 2);
            }
            return this.l;
          }};
          Date.now || (Date.now = function() {
            return (new Date).getTime();
          });
          (function() {
            for (var a = ["ms", "moz", "webkit", "o"], b = 0; b < a.length && !d.requestAnimationFrame; ++b) {
              d.requestAnimationFrame = d[a[b] + "RequestAnimationFrame"], d.cancelAnimationFrame = d[a[b] + "CancelAnimationFrame"] || d[a[b] + "CancelRequestAnimationFrame"];
            }
            d.requestAnimationFrame || (d.requestAnimationFrame = function(a) {
              return setTimeout(a, 1E3 / 60);
            }, d.cancelAnimationFrame = function(a) {
              clearTimeout(a);
            });
          })();
          var Rb = {X:function(a) {
            function b(a) {
              a < d && (a = d);
              a > f && (a = f);
              return ~~((a - d) / 32);
            }
            function c(a) {
              a < e && (a = e);
              a > h && (a = h);
              return ~~((a - e) / 32);
            }
            var d = a.ba, e = a.ca, f = a.Z, h = a.$, k = ~~((f - d) / 32) + 1, l = ~~((h - e) / 32) + 1, m = Array(k * l);
            return {Y:function(a) {
              var d = b(a.x) + c(a.y) * k;
              null == m[d] ? m[d] = a : Array.isArray(m[d]) ? m[d].push(a) : m[d] = [m[d], a];
            }, ea:function(a, d, e, g, f) {
              var h = b(a), n = c(d);
              a = b(a + e);
              d = c(d + g);
              if (0 > h || h >= k || 0 > n || n >= l) {
                debugger;
              }
              for (; n <= d; ++n) {
                for (g = h; g <= a; ++g) {
                  if (e = m[g + n * k], null != e) {
                    if (Array.isArray(e)) {
                      for (var q = 0; q < e.length; q++) {
                        f(e[q]);
                      }
                    } else {
                      f(e);
                    }
                  }
                }
              }
            }};
          }};
          var yb = function() {
            var a = new ca(0, 0, 0, 32, "#ED1C24", ""), b = document.createElement("canvas");
            b.width = 32;
            b.height = 32;
            var c = b.getContext("2d");
            return function() {
              0 < l.length && (a.color = l[0].color, a.t(l[0].name));
              c.clearRect(0, 0, 32, 32);
              c.save();
              c.translate(16, 16);
              c.scale(.4, .4);
              a.s(c);
              c.restore();
              var d = document.getElementById("favicon"), e = d.cloneNode(!0);
              e.setAttribute("href", b.toDataURL("image/png"));
              d.parentNode.replaceChild(e, d);
            };
          }();
          e(function() {
            yb();
          });
          var W = "loginCache3";
          e(function() {
            +d.localStorage.wannaLogin && (d.localStorage[W] && Ib(d.localStorage[W]), d.localStorage.fbPictureCache && e(".agario-profile-picture").attr("src", d.localStorage.fbPictureCache));
          });
          d.facebookLogin = function() {
            d.localStorage.wannaLogin = 1;
          };
          d.fbAsyncInit = function() {
            function a() {
              d.localStorage.wannaLogin = 1;
              null == d.FB ? alert("You seem to have something blocking Facebook on your browser, please check for any extensions") : d.FB.login(function(a) {
                fb(a);
              }, {scope:"public_profile, email"});
            }
            d.FB.init({appId:"677505792353827", cookie:!0, xfbml:!0, status:!0, version:"v2.2"});
            d.FB.Event.subscribe("auth.statusChange", function(b) {
              +d.localStorage.wannaLogin && ("connected" == b.status ? fb(b) : a());
            });
            d.facebookLogin = a;
          };
          d.logout = function() {
            F = null;
            e("#helloContainer").attr("data-logged-in", "0");
            e("#helloContainer").attr("data-has-account-data", "0");
            delete d.localStorage.wannaLogin;
            delete d.localStorage[W];
            delete d.localStorage.fbPictureCache;
            N();
          };
          var ic = function() {
            function a(a, b, c, d, e) {
              var f = b.getContext("2d"), g = b.width;
              b = b.height;
              a.color = e;
              a.t(c);
              a.size = d;
              f.save();
              f.translate(g / 2, b / 2);
              a.s(f);
              f.restore();
            }
            for (var b = new ca(-1, 0, 0, 32, "#5bc0de", ""), c = new ca(-1, 0, 0, 32, "#5bc0de", ""), d = "#0791ff #5a07ff #ff07fe #ffa507 #ff0774 #077fff #3aff07 #ff07ed #07a8ff #ff076e #3fff07 #ff0734 #07ff20 #ff07a2 #ff8207 #07ff0e".split(" "), f = [], h = 0; h < d.length; ++h) {
              var k = h / d.length * 12, n = 30 * Math.sqrt(h / d.length);
              f.push(new ca(-1, Math.cos(k) * n, Math.sin(k) * n, 10, d[h], ""));
            }
            fc(f);
            var l = document.createElement("canvas");
            l.getContext("2d");
            l.width = l.height = 70;
            a(c, l, "", 26, "#ebc0de");
            return function() {
              e(".cell-spinner").filter(":visible").each(function() {
                var c = e(this), d = Date.now(), f = this.width, g = this.height, h = this.getContext("2d");
                h.clearRect(0, 0, f, g);
                h.save();
                h.translate(f / 2, g / 2);
                for (var k = 0; 10 > k; ++k) {
                  h.drawImage(l, (.1 * d + 80 * k) % (f + 140) - f / 2 - 70 - 35, g / 2 * Math.sin((.001 * d + k) % Math.PI * 2) - 35, 70, 70);
                }
                h.restore();
                (c = c.attr("data-itr")) && (c = la(c));
                a(b, this, c || "", +e(this).attr("data-size"), "#5bc0de");
              });
              e("#statsPellets").filter(":visible").each(function() {
                e(this);
                var b = this.width, c = this.height;
                this.getContext("2d").clearRect(0, 0, b, c);
                for (b = 0; b < f.length; b++) {
                  a(f[b], this, "", f[b].size, f[b].color);
                }
              });
            };
          }();
          d.createParty = function() {
            ka(":party");
            P = function(a) {
              gb("/#" + d.encodeURIComponent(a));
              e(".partyToken").val("agar.io/#" + d.encodeURIComponent(a));
              e("#helloContainer").attr("data-party-state", "1");
            };
            N();
          };
          d.joinParty = pb;
          d.cancelParty = function() {
            gb("/");
            e("#helloContainer").attr("data-party-state", "0");
            ka("");
            N();
          };
          var y = [];
          var Xa = 0;
          var Ya = "#000000";
          var Za = O = !1;
          var U = Ga = Ha = ab = $a = 0;
          var zb = !0;
          setInterval(function() {
            Za && y.push(Fb() / 100);
          }, 1E3 / 60);
          setInterval(function() {
            var a = hc();
            0 != a && (++Ha, 0 == U && (U = a), U = Math.min(U, a));
          }, 1E3);
          d.closeStats = function() {
            O = !1;
            e("#stats").hide();
            rb(d.ab);
            ya(0);
          };
          d.setSkipStats = function(a) {
            zb = !a;
          };
          e(function() {
            e(Pb);
          });
        }
      }
    }
  }
})(window, window.jQuery);

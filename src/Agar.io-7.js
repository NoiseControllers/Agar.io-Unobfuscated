/**
 * ========================
 * Agar.io V7, unobfuscated
 *    By XtremePlayzCODE
 * ========================
 */
(function(wHandle, wjQuery) {
  // Surprisingly a lot like Protocol 5, so let's use the same variable names
  
  // Modded wrapper
  wHandle.AgarV72 = {
    xtremecode: true,
    hooks: {},
    debug: true, // Change to false in production!
    cellProp: { // Unused
      x: "",
      y: "",
      size: ""
    },
    allCells: {},
    myCells: [],
    leaderboard: [],
    leaderboardTeams: [],
    dimensions: [
      -7071.067811865476,
      -7071.067811865476,
      7071.067811865476,
      7071.067811865476
    ],
    rawViewport: {
      x: 0,
      y: 0,
      scale: 1
    },
    disableRendering: false,
    webSocketIP: "",
    webSocketServer: null,
    minScale: 1,
    showStartupBackground: true,
    aliveCellsList: [],
    eatenCellsList: [],
    drawScale: 1,
    drawGrid: true,
    enableDirectionSending: true,
    simpleCellDraw: false,
    vector: (function() {
      function Vector(x, y) {
        if (!(this instanceof Vector)) {
          return new Vector(x, y);
        }
      
        this.x = x;
        this.y = y;
      }
      
      Vector.prototype.update = function(x, y) {
        this.x = x;
        this.y = y;
        return this;
      };
      
      Vector.prototype.toString = function(places) {
        var scalar = Math.pow(10, places);
        return "[" + Math.round(this.x * scalar) / scalar + ", " + Math.round(this.y * scalar) / scalar + "]";
      };
      
      Vector.prototype.clone = function() {
        return new Vector(this.x, this.y);
      };
      
      Vector.prototype.copyTo = function(vector) {
        vector.x = this.x;
        vector.y = this.y;
        return this;
      };
      
      Vector.prototype.copyFrom = function(vector) {
        this.x = vector.x;
        this.y = vector.y;
        return this;
      };
      
      Vector.prototype.getMagnitude = function() {
        return Math.sqrt((this.x * this.x) + (this.y * this.y));
      };
      
      Vector.prototype.getRawMagnitude = Vector.prototype.magnitudeSquared = function() {
        return (this.x * this.x) + (this.y + this.y);
      };
      
      Vector.prototype.normalize = function() {
        var magnitude = this.getMagnitude();
        this.x = this.x / magnitude;
        this.y = this.y / magnitude;
        return this;
      };
      
      Vector.prototype.reverse = function() {
        this.x = (~this.x) + 1;
        this.y = (~this.y) + 1;
        return this;
      };
      
      Vector.prototype.addVector = function(vector) {
        this.x += vector.x;
        this.y += vector.y;
        return this;
      };
      
      Vector.prototype.addVectorNew = function(vector) {
        return new Vector(this.x + vector.x, this.y + vector.y);
      };
      
      Vector.prototype.minusVector = function(vector) {
        this.x -= vector.x;
        this.y -= vector.y;
        return this;
      };
      
      Vector.prototype.minusVectorNew = function(vector) {
        return new Vector(this.x - vector.x, this.y - vector.y);
      };
      
      Vector.prototype.multiplyScalar = function(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        return this;
      };
      
      Vector.prototype.multiplyScalarNew = function(scalar) {
        var vector = this.clone();
        return vector.multiplyScalar(scalar);
      };
      
      Vector.prototype.divideScalar = function(scalar) {
        this.x /= scalar;
        this.y /= scalar;
        return this;
      };
      
      Vector.prototype.divideScalarNew = function(scalar) {
        var vector = this.clone();
        return vector.divideScalar(scalar);
      };
      
      Vector.prototype.combine = function(vector) {
        return (this.x * vector.x) + (this.y * vector.y);
      };
      
      Vector.prototype.angle = function(radians) {
        return Math.atan2(this.y, this.x) * (radians ? 1 : 180 / Math.PI);
      };
      
      Vector.prototype.rotate = function(angle, radians) {
        var cos = Math.cos(angle * (radians ? 1 : Math.PI / 180));
        var sin = Math.sin(angle * (radians ? 1 : Math.PI / 180));
        var temp = new Vector().copyFrom(this);
        this.x = (temp.x * cos) - (temp.y * sin);
        this.y = (temp.x * sin) + (temp.y * cos);
        return this;
      };
      
      Vector.prototype.equals = function(vector) {
        return ((this.x == vector.x) && (this.y == vector.y));
      };
      
      Vector.prototype.isCloseTo = function(vector, tolerance) {
        if (this.equals(vector))
          return true;
          
        var temp = new Vector();
        temp.copyFrom(this);
        temp.minusVector(vector);
        
        return (temp.getRawMagnitude() < tolerance * tolerance);
      };
      
      Vector.prototype.rotateAroundPoint = function(point, angle, radians) {
        var temp = new Vector();
        temp.copyFrom(this);
        temp.minusVector(point);
        temp.rotate(angle, radians);
        temp.plusVector(point);
        this.copyFrom(temp);
        return this;
      };
      
      Vector.prototype.isMagnitudeLessThan = function(distance) {
        return (this.getRawMagnitude() < distance * distance);
      };
      
      Vector.prototype.isMagnitudeGreaterThan = function(distance) {
        return (this.getRawMagnitude() > distance * distance);
      };
      
      return Vector;
    })()
  };
})((global = window || this), global.$ || global.jQuery);

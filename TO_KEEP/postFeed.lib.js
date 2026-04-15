export class Vec2 {
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
    static Magnitude(v){
        const px = Math.pow(v.x,2);
        const py = Math.pow(v.y,2);
        const magnitude = Math.sqrt(px+py);
        return magnitude;
    }
    static Delta(vMinuend,vSubtrahend){
        const dx = vMinuend.x - vSubtrahend.x;
        const dy = vMinuend.y - vSubtrahend.y;
        return new Vec2(dx,dy);
    }
}
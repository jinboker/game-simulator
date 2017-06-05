import Tank from './tank';
import res from '../data/assets';
import { inputParam } from '../global/var';
import TankCollisionDetection from '../collision/tankCollisionDetection';

const ATTACK_AUD = res.audio.attack;

export default class Player extends Tank {
  private detectionCollision: TankCollisionDetection;

  constructor(
    x: number,
    y: number,
    direction: string,
    type: string,
    rank: number
  ) {
    super(x, y, direction, type, rank);

    this.speed = 2;
    this.couldMove = false;

    this.detectionCollision = new TankCollisionDetection(this.distanceToCenter);
  }

  getNextPosition(): number[] {
    let [x, y] = [this.x, this.y];

    // 确定是否需要移动或者改变方向
    const directionKey = inputParam.directionKey;
    // 通过比对当前方向与按下的方向，判断是否需要改变方向，如果需要改变，则优先改变方向
    this.beChangeDirection = (Boolean(directionKey) && this.direction !== directionKey);
    if (this.beChangeDirection) {
      this.direction = directionKey;
      [x, y] = this.getPositionAfterChangeDirection();
    } else {
      // 确定是否能够移动
      this.couldMove = inputParam[directionKey];
      if (this.couldMove) {
        this.changeWheelPic();
        [x, y] = this.getNextPositionIfCouldMove();
      }
    }

    return [x, y];
  }

  affirmPosition() {
    // 确定下一个位置的值
    [this.next_x, this.next_y] = this.getNextPosition();
    // 检查当坦克移动到下个位置以后是否会产生碰撞
    this.collisionInfo = this.detectionCollision.getCollisionInfo(this.direction, this.next_x, this.next_y);
    // 如果没有碰撞则确定位置
    if (!this.collisionInfo.isCollision) {
      [this.x, this.y] = [this.next_x, this.next_y]
    }
  }
}
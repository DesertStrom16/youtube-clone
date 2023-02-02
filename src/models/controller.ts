class Controller {
    marketUrl: string;
    currentStatus: "running" | "stopped";
    intendedStatus: "stop" | "none";
    tolerance: number;
    uid: string;
    name: string;

  constructor(
    marketUrl: string,
    currentStatus: "running" | "stopped",
    intendedStatus: "stop" | "none",
    tolerance: number,
    uid: string,
    name: string,
  ) {
    this.marketUrl = marketUrl;
    this.currentStatus = currentStatus;
    this.intendedStatus = intendedStatus;
    this.tolerance = tolerance;
    this.uid = uid;
    this.name = name;
  }
}

export default Controller;

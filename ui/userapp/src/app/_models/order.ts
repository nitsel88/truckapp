export interface Order {
    orderId:string,
    userId:string,
    driverId?:string,
    status:string,
    orderDesc:string,
    packageDim: {
        height:number,
        width:number,
        length:number,
        weight:number
    },
    pickUpDest: {
        lat:string,
        long:string,
        city?:string,
        area?:string
    },
    dropDest: {
        lat:string,
        long:string,
        city?:string,
        area?:string
    }
    comments?: [{
        id:number,
        desc:String
    }]
}

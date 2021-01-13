const Oss = require('ali-oss');

export default {
    constructor(){
        this.alioss = new Oss({
            bucket: 'vrhouse-web',
            region: 'oss-cn-shanghai',
            accessKeyId: '',
            accessKeySecret: '',
            stsToken : ''
        })
    }
}

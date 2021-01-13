const Minio = require('minio');
const Config = require('../../config');

export default class{
    constructor() {
        this.init();
    }
    init(){
        this.minio = new Minio.Client({
            endPoint: Config.default.minio.EndPoint,
            port: Config.default.minio.Port,
            useSSL: false,
            accessKey: Config.default.minio.AccessKey,
            secretKey: Config.default.minio.AccessSecret
        });
        // this.upLoad();//测试
    }

    /**
     * 上传内容至minio
     * @param content：字符流 string
     */
    upLoad(content){
        let client = this.minio;
        let buffer = content;
        return new Promise((resolve, reject) => {
            client.putObject(Config.default.minio.bucket, `${Config.default.minio.fileName}.${Config.default.minio.fileType}`, buffer, function(err, etag) {
                console.log(err, etag);
                if(etag) resolve();
                else reject();
            })
        })
    }
    getBucket(){

    }

    /**
     * 创建一个新的存储桶
     * @param bucketName
     */
    makeBucket(bucketName, region){
        this.minio.makeBucket(bucketName, region || 'us-east-1', function(err) {
            if (err) return console.log('Error creating bucket.', err)
            console.log('Bucket created successfully in "us-east-1".')
        })
    }

    /**
     * 删除存储桶
     */
    removeBucket(bucket){
        this.minio.removeBucket(bucket, function(err) {
            if (err) return console.log('unable to remove bucket.')
            console.log('Bucket removed successfully.')
        })
    }

    /**
     * 验证存储桶是否存在
     * @param bucket
     */
    bucketExists(bucket){
        this.minio.bucketExists(bucket, function(err) {
            if (err) {
                if (err.code == 'NoSuchBucket') return console.log("bucket does not exist.")
                return console.log(err)
            }
            // if err is null it indicates that the bucket exists.
            console.log('Bucket exists.')
        })
    }

    /**
     * 列出所有存储桶
     */
    listBuckets(){
        this.minio.listBuckets(function(err, buckets) {
            if (err) return console.log(err);
            console.log('buckets :', buckets)
        })
    }

    /**
     * 设置指定存储桶的策略。如果objectPrefix不为空，则会给符合该前缀的对象（们）设置策略
     * @param bucketName
     * @param objectPrefix 'img-'
     * @param bucketPolicy minio.Policy.NONE，minio.Policy.READONLY，minio.Policy.WRITEONLY或者minio.Policy.READWRITE
     */
    setBucketPolicy(bucketName, objectPrefix, bucketPolicy){
        // Set the bucket policy of `my-bucketname` to `readonly` (only allow retrieval),
        // but only for objects that start with 'img-'.
        this.minio.setBucketPolicy(bucketName, objectPrefix, bucketPolicy, function(err) {
            if (err) throw err;
            console.log('Set bucket policy to \'readonly\'.')
        })
    }
    /**
     * 列出存储桶中所有对象
     */
    listObjects(bucket){
        let stream = this.minio.listObjects(bucket, '' , true);
        stream.on('data', function(obj) { console.log(obj) } );
        stream.on('error', function(err) { console.log(err) } )
    }

    /**
     * 删除一个对象
     * @param bucketName
     */
    removeObject(bucketName, fileName){
        this.minio.removeObject(bucketName, fileName, function(err) {
            if (err) {
                return console.log('Unable to remove object', err)
            }
            console.log('Removed the object')
        })
    }
}

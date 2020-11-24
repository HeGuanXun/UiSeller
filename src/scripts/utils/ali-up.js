import OSS from 'ali-oss'
import { gethashcode } from './hash'
const OSSConfig = {
  uploadHost: 'http://ylshop.oss-cn-shenzhen.aliyuncs.com', //OSS上传地址
  ossParams: {
    region: 'oss-cn-shenzhen',
    success_action_status: '200', // 默认200
    accessKeyId: 'LTAI4FeehA9TxEfZUSKzKZKf',
    accessKeySecret: 'PiQO4rIx0FaBEHRu47692dNdDHIct5',
    bucket: 'ylshop',
  },
};
const extname = (filename) => {
  if (!filename || typeof filename !== 'string') {
     return false
  }
  const a = filename.split('').reverse().join('');
  const b = a.substring(0, a.search(/\./)).split('').reverse().join('');
  return b
};

export async function uploadOSS(file, that, dir = 'platform/img/tmp/',loading) {
    const errorF = () => {
      loading.close();
      that.$alert({
        title: '提示',
        message: '图片上传失败，请检查您的网络',
      });
      return ''
    };
    const client = new OSS({
      region: OSSConfig.ossParams.region,
      accessKeyId: OSSConfig.ossParams.accessKeyId,
      accessKeySecret: OSSConfig.ossParams.accessKeySecret,
      bucket: OSSConfig.ossParams.bucket,
    });
    const hash = gethashcode(file.name);
    const name = `${dir}${hash}.${extname(file.name)}`;
    try {
      const res = await client.multipartUpload(name, file);
      if (res && res.res && res.res.status === 200) {
        loading.close();
        return res
      }
      return errorF()
    } catch (error) {
      return errorF()
    }
}

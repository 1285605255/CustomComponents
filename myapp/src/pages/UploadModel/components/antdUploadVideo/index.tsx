import React, { useState, useEffect } from 'react';
import { Upload,  message, Empty, Image } from 'antd';
import { useRequest,Link } from 'umi';
import { request } from 'umi';
import { InboxOutlined } from '@ant-design/icons';
import VideoPlayer from '@/components/DPlayer';

const { Dragger } = Upload;

const UploadVideo: React.FC = () => {
  const [FileUrl, setFileUrl] = useState<string>();
  const [FileType, setFileType] = useState<string>();

  const props: object = {
    name: 'file',
    multiple: true,
    listType: 'picture',
    accept: '.jpeg ,.jpg ,.png,.pdf,.docx,.mp4,.mp3,.xls,.doc,.xlsx',
    action: '/api/parse/video/upload/',
    // action: 'api/streamVideo',
    onChange(info: any) {
      const { status } = info.file;
      if (status === 'done') {
        if (info.file.response.message === '上传成功') {
          message.success(`文件${info.file.response.message}`);
        } else {
          message.warning(`文件${info.file.response.message}`);
        }
      } else if (status === 'error') {
        message.error(`文件${info.file.response.message}`);
      }
    },
    onDrop(e: any) {
      console.log('Dropped files', e.dataTransfer.files);
    },
    onPreview(file: any) {
      const SpFileType = file.type.split('/')[0];
      switch (SpFileType) {
        case 'image':
          setFileType('image');
          setFileUrl(file.thumbUrl);
          break;
        case 'video':
          setFileType('video');
          setFileUrl(`http://127.0.0.1:7001/${file.response.data.imgUrl}`);
          break;
        default:
          break;
      }
    },
  };

  return (
    <div>
      <div style={{ height: '9rem' }}>
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">单击或拖动文件到此区域以上载</p>
        </Dragger>
      </div>
      <div style={{ marginTop: '10rem', width: '60%', height: '30rem' }}>
        {FileType === 'image' ? (
          <Image width={400} src={FileUrl && FileUrl} />
        ):
        FileType === 'video' ? (
          <VideoPlayer url={"error" || FileUrl} />
        ) : (
          <Empty description={false} />
        )}
      </div>
      <div>
        <Link to={'/UploadModel/ViewVideo'}>跳转表情处理页面{'>>'}</Link>
      </div>
    </div>
  );
};
export default UploadVideo;

import React, { useState, useEffect } from 'react';
import { Upload, Button, Form, message, Input, Typography } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Dropzone from 'react-dropzone';
import styles from './index.less';
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';

const UploadVideo: React.FC = (props) => {
  const onDrop = (files: any) => {
    let formData = new FormData();
    const config: Object = {
      header: { 'content-type': 'multipart/form-data' },
    };
    formData.append('file', files[0]);
    axios.post('http://127.0.0.1:7001/video', formData, config).then((response) => {
      if (response.status) {
      } else {
        message.error('文件上传失败');
      }
    });
  };

  return (
    <Form>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Dropzone onDrop={onDrop} multiple={false} maxSize={80000000000}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div className={styles.uploadVideoStyle} {...getRootProps()}>
                <input {...getInputProps()} />
                <div>
                  <PlusOutlined />
                </div>
              </div>
            </section>
          )}
        </Dropzone>
      </div>
    </Form>
  );
};
export default UploadVideo;

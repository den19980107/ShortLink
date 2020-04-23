import React from 'react';
import { Upload, Button, Icon, message } from 'antd';
import './FileUploader.css'
const FileUploader = ({ onChange, style }) => {
    const props = {
        action: '/api/file/upload',
        onChange({ file, fileList }) {
            if (file.status !== 'uploading') {
                if (file.xhr && file.xhr.status == 200) {
                    message.success("上傳成功！")
                    onChange(file.response.fileUrl)
                } else {
                    message.error("上傳失敗！")
                }
            }
        },
        showUploadList: false,
    };
    const checkFileSize = (file) => {
        const isLt2M = file.size / 1024 / 1024 < 50;
        if (!isLt2M) {
            message.error('你只能上傳小於 50MB 的照片!');
        }
        return isLt2M;
    }
    return (
        <Upload
            {...props}
            beforeUpload={checkFileSize}
            className="uploader">
            <button style={{ fontSize: "20px", padding: "0.5rem", backgroundColor: "white", border: "0.5px solid #ccc", ...style }}>
                <Icon type="upload" /> 上傳檔案
         </button>
        </Upload>
    );
};

export default FileUploader;
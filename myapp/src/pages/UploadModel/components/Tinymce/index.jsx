import React, { memo } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { update_img } from '../api/img'   //update_img是自己定义的上传图片视频方法,需要自行封装，很简单


const Tinymce = memo((props) => {　　//上传内容改变，处理
    let handleEditorChange = (content, editor) => {
        // console.log('Content was updated:', content);
        props.setarticleContentHandle(content)   //props.父级的方法，自己定义
    }  
    //上传图片
    let images_upload_handler = async (blob, success, fail) => {
        let param = new FormData();
        param.append("img", blob.blob());
        let data = await update_img(param);//update_img是自己定义的上传图片视频方法,需要自行封装，很简单
        success(data.url);
    }
    //上传视频
    let file_picker_callback = async (cb, value, meta) => {
        //当点击meidia图标上传时,判断meta.filetype == 'media'有必要，因为file_picker_callback是media(媒体)、image(图片)、file(文件)的共同入口
        if (meta.filetype == 'media') {
            //创建一个隐藏的type=file的文件选择input
            let input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.onchange = async function () {
                let file = this.files[0];
                var formData;
                formData = new FormData();
                //假设接口接收参数为file,值为选中的文件
                formData.append('img', file);
                //正式使用将下面被注释的内容恢复
                let data = await update_img(formData); //update_img是自己定义的上传图片视频方法,需要自行封装，很简单
                // console.log(data);
                cb(data.url)
            }
            //触发点击
            input.click();
        }
    }
    let self = this;
    return (
        <Editor
            initialValue={props.detail}   //父组件传的值
            apiKey="3gumwdw2xrvqkfci99fk6pqqqnfayhqg2c3w5scmzx9q9ymc"   //可以到官网获取自己的
            init={{
                language: 'zh_CN',
                height: 500,
                menubar: false,
                images_upload_url: "/api/pc/upload/img",
                images_upload_base_path: "/api/pc/upload/img",
                images_upload_credentials: true,
                convert_urls: false, //这个参数加上去就可以了
                file_picker_types: 'media',
                plugins: 'powerpaste textcolor print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
                powerpaste_word_import: 'propmt',
                powerpaste_html_import: 'propmt',
                powerpaste_allow_local_images: true,
                paste_data_images: true,
                toolbar: 'preview undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify| forecolor backcolor removeformat |image media numlist bullist | outdent indent  | pagebreak | charmap emoticons | fu',
                video_template_callback: function (data, videoTemplateCallback) {
                    return `<span class="mce-preview-object mce-object-video" contenteditable="false" data-mce-object="video" data-mce-p-allowfullscreen="allowfullscreen" data-mce-p-frameborder="no" data-mce-p-scrolling="no" data-mce-p-src='${data.source}' data-mce-p-width='${data.width}' data-mce-p-height='${data.height}' data-mce-p-controls="controls" data-mce-html="%20"> <video width='${data.width}' height='${data.height}' controls="controls"> <source src='${data.source}' type='${data.sourcemime}'></source> </video> </span>`
 
                },
                images_upload_handler,
                file_picker_callback
            }}
 
            onEditorChange={handleEditorChange}
        />
    );
});
 
export default Tinymce
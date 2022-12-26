<template>
    <editor 
        ref="editor"
        :options="editorOptions"
        height="800px"
        previewStyle="vertical"
        initialEditType="markdown"
    />
</template>

<script>
import axios from '@/service/axios';
import { Editor } from "@toast-ui/vue-editor";
import '@toast-ui/editor/dist/toastui-editor.css';

import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';

import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js';

import "@toast-ui/editor/dist/i18n/ko-kr";

import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";

export default {
    components: {
        editor: Editor
    },
    props: {
        boardId : Number,
    },
    data() {
        return {
            editorOptions: {
                plugins: [
                    colorSyntax,
                    codeSyntaxHighlight,
                ],
                previewStyle:"vertical",
                language:"ko",
                hooks: {
                    addImageBlobHook: this.addImageBlobHook,
                },
            },
        }
    },
    methods: {
        getContent() {
            return this.$refs.editor.invoke('getMarkdown');
        },
        setContent(content) {
            this.$refs.editor.invoke('setMarkdown', content);
        },
        async addImageBlobHook(blob, callback) {
            const formData = new FormData();
            formData.append("image", blob);
            const response = await axios.post('/api/boards/'+ this.boardId +'/images', formData, { headers: {'Content-Type': 'multipart/form-data'}});
            callback(process.env.VUE_APP_RESOURCE_URL + response.data.path, response.data.filename);
        },
    },
    mounted() {
    }
}
</script>
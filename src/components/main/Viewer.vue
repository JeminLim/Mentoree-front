<template>
    <div>
        <viewer
            ref="toastViewer"
            height="800px"
            :options="viewOptions"
        />
    </div>
</template>

<script>
import { Viewer } from '@toast-ui/vue-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';

import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';

import Prism from 'prismjs';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';

export default{
    components: {
        viewer: Viewer
    },
    data() {
        return {
            viewOptions: {
                plugins: [
                    [codeSyntaxHighlight, {highlighter: Prism}]
                ]
            }
        }
    },
    methods: {
        setContent(content) {
            this.$refs.toastViewer.invoke('setMarkdown', content);
        }
    }

}

</script>
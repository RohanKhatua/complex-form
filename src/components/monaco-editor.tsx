import React from 'react';
import Editor from '@monaco-editor/react';
import useStore from '@/store';

const MonacoEditor: React.FC = () => {

    const { formData } = useStore();

    return (
        formData &&
        <Editor
            height="400px"
            defaultLanguage="json"
            value={JSON.stringify(formData, null, 2)}
            options={{
                readOnly: true,
                minimap: { enabled: false },
            }}
        />
    );
};

export default MonacoEditor;
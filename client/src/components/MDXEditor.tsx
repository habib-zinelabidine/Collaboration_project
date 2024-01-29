import "@mdxeditor/editor/style.css";

import {
  BlockTypeSelect,
  CreateLink,
  InsertImage,
  ListsToggle,
  MDXEditorMethods,
  imagePlugin,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  MDXEditor,
  MDXEditorProps,
  headingsPlugin,
  BoldItalicUnderlineToggles,
  toolbarPlugin,
} from "@mdxeditor/editor";
import { forwardRef } from "react";
import httpClient from "../axios";

const MarkdownEditor = forwardRef<MDXEditorMethods, MDXEditorProps>(
  (props, ref) => {
    return (
      <MDXEditor ref={ref} plugins={setupPlugins(props.readOnly)} {...props} />
    );
  }
);
async function imageUploadHandler(image: File) {
  const formData = new FormData();
  formData.append("imageUrl", image);
  const response = await httpClient.post("/api/image/upload/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return Promise.resolve(response.data.imageUrl);
}

function setupPlugins(isReadOnly: boolean = false) {
  const plugins = [
    headingsPlugin(),
    listsPlugin(),
    linkPlugin(),
    linkDialogPlugin(),
    imagePlugin({
      imageUploadHandler,
    }),
  ];

  const toolbarPlugins = toolbarPlugin({
    toolbarContents: () => (
      <>
        <BoldItalicUnderlineToggles />
        <BlockTypeSelect />
        <CreateLink />
        <InsertImage />
        <ListsToggle />
      </>
    ),
  });

  if (isReadOnly) return plugins;
  return [...plugins, toolbarPlugins];
}

export default MarkdownEditor;

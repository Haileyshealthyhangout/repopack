import type { OutputGeneratorContext } from './outputGeneratorTypes.js';

export const generateXmlStyle = (data: OutputGeneratorContext): string => {
  const { generationDate, treeString, processedFiles, config } = data;

  let xml = `<summary>

<header>
Repopack Output File
This file was generated by Repopack on: ${generationDate}
</header>

<purpose>
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.
</purpose>

<file_format>
The content is organized as follows:
1. This summary section
2. Repository structure
3. Repository files, each consisting of:
  - File path as an attribute
  - Full contents of the file
</file_format>

<usage_guidelines>
1. This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
2. When processing this file, use the file path attributes to distinguish
  between different files in the repository.
3. Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.
</usage_guidelines>

<notes>
- Some files may have been excluded based on .gitignore rules and Repopack's
  configuration.
- Binary files are not included in this packed representation.
${config.output.removeComments ? '- Code comments have been removed.\n' : ''}
${config.output.showLineNumbers ? '- Line numbers have been added to the beginning of each line.\n' : ''}
</notes>

<additional_info>
For more information about Repopack, visit: https://github.com/yamadashy/repopack
</additional_info>
`;

  if (config.output.headerText) {
    xml += `
<user_provided_header>
${config.output.headerText}
</user_provided_header>
`;
  }

  xml += `
</summary>

<repository_structure>
${treeString}
</repository_structure>

<repository_files>
`;

  for (const file of processedFiles) {
    xml += `
<file path="${file.path}">
${file.content}
</file>
`;
  }

  xml += `
</repository_files>
`;

  return `${xml.trim()}\n`;
};

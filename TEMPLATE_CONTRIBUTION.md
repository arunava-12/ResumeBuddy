# ResumeBuddy 模板贡献

<div align="center">
  <img src="public/logo-500.png" alt="ResumeBuddy Logo" width="150" />
</div>

## Table of Contents

- [Template Structure](#template-structure)
- [Creating a New Template](#creating-a-new-template)
- [Style Guide](#style-guide)
- [Best Practices](#best-practices)
- [Testing Templates](#testing-templates)
- [Submitting Contributions](#submitting-contributions)

## Introduction

ResumeBuddy is an open-source resume builder that allows users to create, edit, and export professional resume PDFs. We welcome community contributions of new resume templates to enrich user choices. This document will guide you on how to create and contribute new resume templates to the project.

## Template Structure

每个模板都是一个 TypeScript 文件，遵循特定的接口规范。所有模板文件位于 `src/app/components/Resume/ResumePDF/templates/` 目录下。

一个标准的模板文件结构如下：

```typescript
import type { Template, TemplateStyles } from "./index";

export const myNewTemplate: Template = {
  id: "myNewTemplate", // 模板唯一标识符
  name: "我的新模板", // 显示给用户的模板名称
  description: "对模板的简短描述", // 模板的描述信息
  getStyles: (themeColor: string, spacing: any): TemplateStyles => {
    return {
      // 这里定义各种样式
      header: {
        /* 头部样式 */
      },
      headerText: {
        /* 头部文本样式 */
      },
      content: {
        /* 内容区样式 */
      },
      section: {
        /* 每个部分的样式 */
      },
      // 其他样式...
    };
  },
};
```

## Creating a New Template

### Basic Steps

1. **Create Template File**: In the `src/app/components/Resume/ResumePDF/templates/` directory, create a new TypeScript file, such as `myNewTemplate.ts`

2. **Implement Template Interface**: Example:

```typescript
import type { Template, TemplateStyles } from "./index";

export const myNewTemplate: Template = {
  id: "myNewTemplate", // 模板ID，必须唯一
  name: "我的新模板", // 模板名称
  description: "这是一个新的简历模板描述", // 模板描述
  getStyles: (themeColor: string, spacing: any): TemplateStyles => {
    return {
      // 在这里实现您的样式
      header: {
        // 头部样式
      },
      headerText: {
        // 头部文本样式
      },
      content: {
        // 内容区域样式
        padding: `${spacing[3]} ${spacing[10]}`,
      },
      section: {
        // 每个部分的样式
        marginTop: spacing[4],
      },
      sectionTitle: {
        // 部分标题样式
        fontSize: "12pt",
        fontWeight: "bold",
        marginBottom: spacing[2],
      },
      bullet: {
        // 项目符号样式
        color: themeColor,
      },
      name: {
        // Name style
        fontSize: "20pt",
      },
      date: {
        // Date style
      },
      company: {
        // Company name style
        fontWeight: "bold",
      },
      jobTitle: {
        // Job title style
      },
      school: {
        // School name style
        fontWeight: "bold",
      },
      degree: {
        // Degree style
      },
      projectTitle: {
        // Project title style
        fontWeight: "bold",
      },
      contact: {
        // Contact style
      },
    };
  },
};
```

3. **Register template**: Import and register your template in the `src/app/components/Resume/ResumePDF/templates/index.ts` file:

```typescript
import { myNewTemplate } from "./myNewTemplate";

// Add your template import in the import section

export const templates: Record<string, Template> = {
  // Add your template to this object
  classic: classicTemplate,
  professional: professionalTemplate,
  // ...other existing templates
  myNewTemplate: myNewTemplate, // Add your new template
};
```

4. **Add template translation**: Add template support in the `src/app/components/ResumeForm/ThemeForm/Selection.tsx` file:

```typescript
// Find the translateTemplate function and add your template translation
myNewTemplate: {
  en: {
    name: "My New Template", // English name
    description: "Description of my new template in English", // English description
  },
},
```

### Style Guide

Template styles use React PDF's style system

#### Style Attributes

React PDF supports a wide range of CSS attributes, here are the valid CSS attributes that can be used in templates:

**Flexbox Layout**

- `alignContent`, `alignItems`, `alignSelf`
- `flex`, `
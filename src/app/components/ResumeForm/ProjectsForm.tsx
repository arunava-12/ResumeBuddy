import { Form, FormSection } from "components/ResumeForm/Form";
import {
  Input,
  BulletListTextarea,
} from "components/ResumeForm/Form/InputGroup";
import type { CreateHandleChangeArgsWithDescriptions } from "components/ResumeForm/types";
import { useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "lib/redux/hooks";
import { selectProjects, changeProjects } from "lib/redux/resumeSlice";
import type { ResumeProject } from "lib/redux/types";
import {
  updateFormHeadingIfNotCustomized,
} from "lib/redux/settingsSlice";

export const ProjectsForm = () => {
  const projects = useAppSelector(selectProjects);
  const dispatch = useAppDispatch();
  const showDelete = projects.length > 1;

  const translate = useCallback(
    (key: string) => {
      const translations: Record<string, string> = {
        projects: "Projects",
        addProject: "Add Project",
        deleteProject: "Delete Project",
        projectName: "Project Name",
        date: "Date",
        projectDescription: "Project Description",
      };

      return translations[key] || key;
    },
    []
  );

  useEffect(() => {
    dispatch(
      updateFormHeadingIfNotCustomized({
        field: "projects",
        value: translate("projects"),
      })
    );
  }, [dispatch, translate]);

  return (
    <Form form="projects" addButtonText={translate("addProject")}>
      {projects.map(({ id, project, date, descriptions }, idx) => {
        const handleProjectChange = (
          ...[field, value]: CreateHandleChangeArgsWithDescriptions<ResumeProject>
        ) => {
          dispatch(changeProjects({ idx, field, value } as any));
        };
        const showMoveUp = idx !== 0;
        const showMoveDown = idx !== projects.length - 1;

        return (
          <FormSection
            key={id || `project-${idx}`}
            form="projects"
            idx={idx}
            showMoveUp={showMoveUp}
            showMoveDown={showMoveDown}
            showDelete={showDelete}
            deleteButtonTooltipText={translate("deleteProject")}
          >
            <Input
              name="project"
              label={translate("projectName")}
              placeholder=""
              value={project}
              onChange={handleProjectChange}
              labelClassName="col-span-4 text-white"
            />
            <Input
              name="date"
              label={translate("date")}
              placeholder=""
              value={date}
              onChange={handleProjectChange}
              labelClassName="col-span-2 text-white"
            />
            <BulletListTextarea
              name="descriptions"
              label={translate("projectDescription")}
              placeholder="Supports Markdown, see editor instructions for details"
              value={descriptions}
              onChange={handleProjectChange}
              labelClassName="col-span-full text-white"
            />
          </FormSection>
        );
      })}
    </Form>
  );
};

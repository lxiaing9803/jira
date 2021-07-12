import styled from "@emotion/styled"
import { Divider, List, Popover, Typography } from "antd"
import { useDispatch } from "react-redux"
import { projectListActions } from "screens/project-list/project-list.slice"
import { useProjects } from "utils/project"
import { ButtonNoPadding } from "./lib"

export const ProjectPopover = () => {
    const dispatch = useDispatch()
    const { data: projects } = useProjects()
    const pinProjects = projects?.filter(project => project.pin)
    const content = (
        <ContentContainer>
            <Typography.Text type="secondary">收藏项目</Typography.Text>
            <List>
                {
                    pinProjects?.map(project => <List.Item key={project.id}>
                        <List.Item.Meta title={project.name} />
                    </List.Item>)
                }
            </List>
            <Divider />
            <ButtonNoPadding
                onClick={() => dispatch(projectListActions.openProjectModal())}
                type="link"
            >
                创建项目
            </ButtonNoPadding>
        </ContentContainer>
    )
    return <Popover placement="bottom" content={content}>
        <span>项目</span>
    </Popover>


}

const ContentContainer = styled.div`
    min-width: 30rem;
`
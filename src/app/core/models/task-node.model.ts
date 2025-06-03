export interface TaskNode {
    id: string;
    text: string;
    pid?: string;
    expanded?: boolean;
    children?: TaskNode[];
    hasChildren?: boolean;
    isChecked?: boolean;
}

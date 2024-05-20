export interface ListItem {
  avatar: string;
  title: string;
  datetime: string;
  type: string;
  description: string;
  status?: "primary" | "success" | "warning" | "info" | "danger";
  extra?: string;
}

export interface TabItem {
  key: string;
  name: string;
  list: ListItem[];
}

export const noticesData: TabItem[] = [
  {
    key: "1",
    name: "通知",
    list: [
      {
        avatar:
          "https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png",
        title: "你收到了 12 份思维训练报告",
        datetime: "一天前",
        description: "",
        type: "1"
      },
      {
        avatar:
          "https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png",
        title: "闯关题目更新",
        datetime: "三天前",
        description: "",
        type: "1"
      }
    ]
  },
  {
    key: "2",
    name: "消息",
    list: [
      {
        avatar:
          "https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg",
        title: "bosom 数学关卡活得满分",
        description: "长风破浪会有时,直挂云帆济沧海",
        datetime: "三天前",
        type: "2"
      }
    ]
  },
  {
    key: "3",
    name: "待办",
    list: [
      {
        avatar: "",
        title: "任务名称",
        description: "任务需要在 2024-06-22 20:00 前启动",
        datetime: "",
        extra: "未开始",
        status: "info",
        type: "3"
      },
      {
        avatar: "",
        title: "第三方紧急代码变更",
        description: "提交于 2024-05-26，需在 2024-07-18 前完成代码变更任务",
        datetime: "",
        extra: "马上到期",
        status: "danger",
        type: "3"
      },
      {
        avatar: "",
        title: "Spatial Thinking v2.0 版本发布",
        description: "地理模块更新",
        datetime: "",
        extra: "进行中",
        type: "3"
      }
    ]
  }
];

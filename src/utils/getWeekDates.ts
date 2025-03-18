export default function getWeekDates() {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 获取星期几（0-6，0代表周日）

  // 创建新的日期对象避免污染原日期
  const monday = new Date(today);
  const sunday = new Date(today);

  // 计算周一的日期调整量
  const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // 核心算法
  monday.setDate(today.getDate() + mondayOffset);

  // 周日 = 周一 + 6天
  sunday.setDate(monday.getDate() + 6);

  // 格式化函数（本地时区）
  const format = (date: Date) =>
    [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, '0'),
      String(date.getDate()).padStart(2, '0'),
    ].join('-');

  return {
    monday: format(monday),
    sunday: format(sunday),
  };
}

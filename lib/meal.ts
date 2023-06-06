import School from "school-kr";

const JEONGHYEON = new School();
JEONGHYEON.init(School.Type.HIGH, School.Region.GYEONGGI, "J100007243");

export async function getMeal(): Promise<string> {
  const meals: any = await JEONGHYEON.getMeal().catch(() => ({}));
  const days = new Date().getDate();
  return meals[days] || meals[days + 1] || "급식 정보 없음.";
}

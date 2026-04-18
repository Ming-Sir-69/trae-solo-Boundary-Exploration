/**
 * Trae SOLO 文件预览测试 - TypeScript 脚本
 * 用途：验证 TypeScript (.ts) 格式文件的预览能力
 */

// 接口定义
interface TestFile {
  id: number;
  filename: string;
  format: string;
  status: "待测试" | "通过" | "失败";
  size: string;
}

interface TestSummary {
  total: number;
  passed: number;
  failed: number;
  passRate: string;
}

// 类型别名
type FormatType = "HTML" | "Markdown" | "JSON" | "CSV" | "TXT" | "XML" | "YAML" | "Python" | "JavaScript" | "TypeScript";

// 常量
const APP_NAME: string = "Trae SOLO";
const VERSION: string = "1.0.0";
const TEST_DATE: string = "2026-04-18";

/**
 * 打印欢迎信息
 */
function helloWorld(name: string): string {
  const message: string = `Hello, ${name}! TypeScript 测试`;
  console.log(message);
  return message;
}

/**
 * 泛型函数：获取数组的第一个元素
 */
function getFirst<T>(arr: T[]): T | undefined {
  return arr.length > 0 ? arr[0] : undefined;
}

/**
 * 类定义：测试运行器
 */
class TestRunner {
  private name: string;
  private results: TestFile[];

  constructor(name: string) {
    this.name = name;
    this.results = [];
  }

  addResult(file: TestFile): void {
    this.results.push(file);
  }

  getSummary(): TestSummary {
    const passed = this.results.filter((r) => r.status === "通过").length;
    const failed = this.results.filter((r) => r.status === "失败").length;
    const total = this.results.length;
    return {
      total,
      passed,
      failed,
      passRate: `${((passed / total) * 100).toFixed(1)}%`,
    };
  }
}

// 枚举
enum TestStatus {
  Pending = "待测试",
  Passed = "通过",
  Failed = "失败",
}

// 主程序
const runner = new TestRunner("文件预览测试");
const firstFile: TestFile = {
  id: 1,
  filename: "test.html",
  format: "HTML",
  status: TestStatus.Pending,
  size: "2KB",
};
runner.addResult(firstFile);

helloWorld(APP_NAME);
console.log("TypeScript 文件预览测试完成");

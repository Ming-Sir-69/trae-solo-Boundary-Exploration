/**
 * Trae SOLO 文件预览测试 - JavaScript 脚本
 * 用途：验证 JavaScript (.js) 格式文件的预览能力
 */

// 常量定义
const APP_NAME = "Trae SOLO";
const VERSION = "1.0.0";
const TEST_DATE = "2026-04-18";

/**
 * 打印欢迎信息
 * @param {string} name - 名称
 * @returns {string} 欢迎消息
 */
function helloWorld(name) {
    const message = `Hello, ${name}! 你好，世界！`;
    console.log(message);
    return message;
}

/**
 * 计算斐波那契数列
 * @param {number} n - 项数
 * @returns {number[]} 斐波那契数列
 */
function fibonacci(n) {
    if (n <= 0) return [];
    if (n === 1) return [0];
    const result = [0, 1];
    for (let i = 2; i < n; i++) {
        result.push(result[i - 1] + result[i - 2]);
    }
    return result;
}

// 类定义
class TestRunner {
    constructor(name) {
        this.name = name;
        this.results = [];
    }

    addResult(format, status) {
        this.results.push({ format, status, timestamp: new Date().toISOString() });
    }

    getSummary() {
        const passed = this.results.filter(r => r.status === "通过").length;
        const failed = this.results.filter(r => r.status === "失败").length;
        return {
            total: this.results.length,
            passed,
            failed,
            passRate: `${((passed / this.results.length) * 100).toFixed(1)}%`
        };
    }
}

// 主程序
const runner = new TestRunner("文件预览测试");
runner.addResult("HTML", "通过");
runner.addResult("Markdown", "通过");
runner.addResult("JSON", "通过");

const summary = runner.getSummary();
console.log(`测试摘要：总计 ${summary.total}，通过 ${summary.passed}，通过率 ${summary.passRate}`);

helloWorld(APP_NAME);
console.log("斐波那契前10项：", fibonacci(10));

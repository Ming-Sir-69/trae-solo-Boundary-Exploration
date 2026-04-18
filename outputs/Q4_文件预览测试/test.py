#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Trae SOLO 文件预览测试 - Python 脚本
用途：验证 Python (.py) 格式文件的预览能力
"""

import sys
import os
from datetime import datetime


def hello_world():
    """打印欢迎信息"""
    message = "Hello, Trae SOLO! 你好，世界！"
    print(message)
    return message


def get_system_info():
    """获取系统信息"""
    info = {
        "platform": sys.platform,
        "python_version": sys.version,
        "current_time": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "current_dir": os.getcwd()
    }
    return info


def main():
    """主函数"""
    print("=" * 50)
    print("Trae SOLO 文件预览测试 - Python")
    print("=" * 50)

    # 调用 hello_world
    result = hello_world()

    # 获取系统信息
    info = get_system_info()
    print(f"\n系统信息：")
    for key, value in info.items():
        print(f"  {key}: {value}")

    print(f"\n返回值：{result}")
    print("测试完成！")


if __name__ == "__main__":
    main()

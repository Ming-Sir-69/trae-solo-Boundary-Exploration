#!/usr/bin/env python3
"""
场景C2：设备温度报警脚本
读取 device_logs.csv，筛选温度 >85°C 的记录，按设备分组汇总，输出报警清单
"""
import csv
import os
from collections import defaultdict

CSV_PATH = os.path.join(os.path.dirname(__file__), '..', 'mock_data', 'mock_c2_logs', 'device_logs.csv')

def main():
    if not os.path.exists(CSV_PATH):
        print(f"错误：找不到文件 {CSV_PATH}")
        return

    alerts = defaultdict(list)  # device_id -> list of (timestamp, temp)

    with open(CSV_PATH, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            temp = float(row['spindle_temp'])
            if temp > 85:
                alerts[row['device_id']].append({
                    'timestamp': row['timestamp'],
                    'temp': temp,
                    'ambient': float(row['ambient_temp'])
                })

    if not alerts:
        print("未检测到异常温度记录（阈值 >85°C）")
        return

    print("=" * 70)
    print("  设备温度报警清单（阈值 >85°C）")
    print("=" * 70)
    print(f"{'设备ID':<12} {'异常次数':>8} {'最高温度':>10} {'首次异常时间':<22}")
    print("-" * 70)

    total_alerts = 0
    for dev_id in sorted(alerts.keys()):
        records = alerts[dev_id]
        max_temp = max(r['temp'] for r in records)
        first_time = min(r['timestamp'] for r in records)
        print(f"{dev_id:<12} {len(records):>8} {max_temp:>9.1f}°C {first_time:<22}")
        total_alerts += len(records)

    print("-" * 70)
    print(f"共 {len(alerts)} 台设备异常，合计 {total_alerts} 条超温记录")
    print("=" * 70)

    # 输出详细记录（每台设备前5条）
    print("\n详细异常记录（每台设备显示前5条）：")
    for dev_id in sorted(alerts.keys()):
        records = sorted(alerts[dev_id], key=lambda x: x['timestamp'])[:5]
        print(f"\n[{dev_id}]")
        for r in records:
            print(f"  {r['timestamp']}  主轴温度: {r['temp']}°C  环境温度: {r['ambient']}°C")
        if len(alerts[dev_id]) > 5:
            print(f"  ... 还有 {len(alerts[dev_id]) - 5} 条记录")

if __name__ == '__main__':
    main()

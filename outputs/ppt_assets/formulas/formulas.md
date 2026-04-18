# Trae SOLO 能力测试 — 公式集

<!-- 公式01 | C2_设备温度异常识别 | 温度阈值判定函数 -->
$$
A(T) = \begin{cases} 1, & T > T_{\text{threshold}} \\ 0, & T \leq T_{\text{threshold}} \end{cases}, \quad T_{\text{threshold}} = 85°\text{C}
$$

<!-- 公式02 | C2_设备温度异常识别 | 异常率统计 -->
$$
R_{\text{anomaly}} = \frac{N_{\text{alert}}}{N_{\text{total}}} \times 100\% = \frac{127}{5760} \approx 2.21\%
$$

<!-- 公式03 | C2_设备温度异常识别 | 滑动窗口移动平均（温度趋势预测） -->
$$
\text{MA}_t = \frac{1}{k}\sum_{i=0}^{k-1} T_{t-i}, \quad k = 5
$$

<!-- 公式04 | C2_设备温度异常识别 | 指数平滑预测模型 -->
$$
\hat{T}_{t+1} = \alpha \cdot T_t + (1 - \alpha) \cdot \hat{T}_t, \quad \alpha \in (0, 1)
$$

<!-- 公式05 | M1_手写记录整理Excel | 销售额汇总 -->
$$
\text{Revenue} = \sum_{i=1}^{n} P_i \times Q_i
$$

<!-- 公式06 | M1_手写记录整理Excel | 销量占比 -->
$$
S_i = \frac{Q_i}{\sum_{j=1}^{n} Q_j} \times 100\%
$$

<!-- 公式07 | M1_手写记录整理Excel | 移动平均预测（下周销量预测） -->
$$
\hat{Q}_{t+1} = \frac{1}{m}\sum_{i=0}^{m-1} Q_{t-i}, \quad m = 3
$$

<!-- 公式08 | M2_PDF入库单提取Excel | 数据提取准确率 -->
$$
\text{Accuracy} = \frac{N_{\text{correct}}}{N_{\text{total}}} \times 100\% = \frac{35}{36} \approx 97.2\%
$$

<!-- 公式09 | M2_PDF入库单提取Excel | 异常检出率 -->
$$
\text{Detection Rate} = \frac{N_{\text{detected}}}{N_{\text{actual}}} \times 100\% = \frac{1}{1} = 100\%
$$

<!-- 公式10 | M2_PDF入库单提取Excel | 库存周转率预测 -->
$$
\text{ITR} = \frac{\text{COGS}}{\text{Avg Inventory}} = \frac{\sum_{i} Q_i \times C_i}{\frac{1}{2}(I_{\text{start}} + I_{\text{end}})}
$$

<!-- 公式11 | M3_用户反馈运营汇报 | 平均响应时间 -->
$$
\bar{t}_{\text{response}} = \frac{1}{N}\sum_{i=1}^{N} t_i = \frac{1}{200}\sum_{i=1}^{200} t_i
$$

<!-- 公式12 | M3_用户反馈运营汇报 | 客户满意度（CSAT） -->
$$
\text{CSAT} = \frac{1}{N}\sum_{i=1}^{N} s_i = \frac{\sum_{j=1}^{5} j \cdot n_j}{\sum_{j=1}^{5} n_j}, \quad s_i \in \{1,2,3,4,5\}
$$

<!-- 公式13 | M3_用户反馈运营汇报 | 月环比增长率 -->
$$
g_{\text{MoM}} = \frac{F_{\text{this month}} - F_{\text{last month}}}{F_{\text{last month}}} \times 100\%
$$

<!-- 公式14 | M3_用户反馈运营汇报 | 趋势预测（线性回归） -->
$$
\hat{y}_t = \beta_0 + \beta_1 \cdot t, \quad \beta_1 = \frac{\sum_{i}(t_i - \bar{t})(y_i - \bar{y})}{\sum_{i}(t_i - \bar{t})^2}
$$

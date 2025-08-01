import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as echarts from 'echarts'

export default function useECharts(echartsData){
      // 定义图表DOM引用
      const chartBody = ref(null);
      // 定义图表实例
      let myChart = null;
      // 初始化图表
      const initChart = () => {
            if(chartBody.value){
                  myChart = echarts.init(chartBody.value);
                  myChart.setOption(echartsData.value);
            }
      }
      // 响应式调整大小
      const resizeChart = () => {
            myChart?.resize();
      }
      // 组件挂载时初始化
      onMounted(() => {
            initChart();
            window.addEventListener('resize', resizeChart);
      });
      // 组件卸载时清理
      onUnmounted(() => {
            window.removeEventListener('resize', resizeChart);
            myChart?.dispose();
      });
      // 监听option变化
      watch(echartsData, (newVal) => {
            myChart?.setOption(newVal);
      }, { deep: true });

      return {chartBody}
}
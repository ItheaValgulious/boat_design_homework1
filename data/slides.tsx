import React from 'react';
import { SlideData } from '../types';
import MathDisplay from '../components/MathDisplay';

// Helper to calculate positions in a spiral/dive pattern
const getSpiralPos = (index: number) => {
  const angle = index * 45; // 45 degrees turn per slide
  const radius = 1200;
  const rad = (angle * Math.PI) / 180;
  return {
    x: Math.sin(rad) * radius,
    y: index * 600, // Go deeper
    z: Math.cos(rad) * radius - (index * 500), // Spiral inwards/outwards
    rotateY: angle,
  };
};

export const slides: SlideData[] = [
  {
    id: 'intro',
    type: 'title',
    title: '深海拖曳系统原理',
    subtitle: 'Deep Sea Towed System Principles',
    transform: { x: 0, y: 0, z: 0, rotateX: 0, rotateY: 0, rotateZ: 0, scale: 1 }
  },
  {
    id: 'pos-1',
    type: 'content',
    title: '定位手段 (1/3)',
    content: (
      <div className="space-y-10">
        <div>
          <h3 className="text-4xl font-bold text-cyan-400 mb-3">卫星定位</h3>
          <p className="text-2xl text-gray-300">顾名思义 (Surface Positioning)</p>
        </div>
        <div>
          <h3 className="text-4xl font-bold text-cyan-400 mb-3">USBL 超短基线定位</h3>
          <ul className="list-disc pl-8 space-y-4 text-gray-300 text-3xl">
            <li>由安装在母船底部的收发换能器和安装在拖体上的应答器组成。</li>
            <li>通过测量声波到达换能器上不同阵元的<strong>相位差</strong>来确定目标的方位，结合信号往返时间计算距离，从而实时解算出目标相对于母船的三维坐标。</li>
          </ul>
        </div>
      </div>
    ),
    transform: { x: 1500, y: 0, z: 0, rotateX: 0, rotateY: -89.9, rotateZ: 0 } // Slight offset from -90 to avoid exact edge cases
  },
  {
    id: 'pos-2',
    type: 'content',
    title: '定位手段 (2/3)',
    content: (
      <div className="space-y-10">
        <div>
          <h3 className="text-4xl font-bold text-cyan-400 mb-3">INS 惯性导航系统</h3>
          <ul className="list-disc pl-8 space-y-4 text-gray-300 text-3xl">
            <li>利用载体内部惯性测量单元（IMU）中的<strong>加速度计</strong>和<strong>陀螺仪</strong>，实时测量运动的加速度与角速度。</li>
            <li>通过数学积分运算（航位推算）连续解算出载体当前的位置、速度和三维姿态。</li>
          </ul>
        </div>
        <div>
          <h3 className="text-4xl font-bold text-cyan-400 mb-3">多普勒计程仪 DVL</h3>
          <ul className="list-disc pl-8 space-y-4 text-gray-300 text-3xl">
            <li>通过向海底发射声波并检测回波频率的偏移（频移），实时解算出水下载体相对于海底的三维运动速度。</li>
            <li>为惯导系统提供精确的速度修正。</li>
          </ul>
        </div>
      </div>
    ),
    transform: { x: 3000, y: 500, z: -1000, rotateX: 10, rotateY: -45, rotateZ: 0 }
  },
  {
    id: 'pos-3',
    type: 'content',
    title: '定位手段 (3/3)',
    content: (
      <div className="space-y-10">
        <div>
          <h3 className="text-4xl font-bold text-cyan-400 mb-3">长基线定位系统 LBL</h3>
          <ul className="list-disc pl-8 space-y-4 text-gray-300 text-3xl">
            <li>通过在作业海域的海底预先布放由多个应答器组成的稀疏基阵（阵元间距通常为几百米至数公里）。</li>
            <li>水下载体通过测量自身至各个已知位置海底应答器的声波传输时间（距离），利用球面交会（三角测量）算法解算出精确坐标。</li>
          </ul>
        </div>
        <div>
          <h3 className="text-4xl font-bold text-cyan-400 mb-3">地形匹配</h3>
          <p className="text-gray-300 text-3xl">Terrain Matching Navigation</p>
        </div>
      </div>
    ),
    transform: { x: 3000, y: 1500, z: -2000, rotateX: 0, rotateY: 0, rotateZ: 90 }
  },
  {
    id: 'control-1',
    type: 'content',
    title: '水下控制手段 (1/3)',
    content: (
      <div>
        <h3 className="text-4xl font-bold text-cyan-400 mb-6">拖缆控制手段</h3>
        <div className="bg-blue-900/30 p-8 rounded-xl border border-blue-500/30">
          <h4 className="text-3xl font-semibold text-yellow-400 mb-4">收放拖缆</h4>
          <ul className="list-disc pl-8 space-y-4 text-gray-300 text-3xl">
            <li>通过母船甲板上的绞车系统调节缆绳的入水长度，从而大范围地改变拖体的潜深。</li>
            <li>现代系统常结合<strong>主动升沉补偿（AHC）</strong>技术，根据母船的波浪运动自动快速收放缆绳，以抵消母船升沉对水下拖体造成的垂直拉扯。</li>
          </ul>
        </div>
      </div>
    ),
    transform: { x: 1000, y: 2500, z: 0, rotateX: -90, rotateY: 0, rotateZ: 0 }
  },
  {
    id: 'control-2',
    type: 'content',
    title: '水下控制手段 (2/3)',
    content: (
      <div>
        <h3 className="text-4xl font-bold text-cyan-400 mb-6">拖体控制手段</h3>
        <ul className="space-y-8">
          <li className="bg-blue-900/20 p-6 rounded-lg border-l-8 border-cyan-500">
            <strong className="block text-yellow-400 text-3xl mb-2">被动控制 (固定水翼)</strong>
            <span className="text-gray-300 text-2xl">利用流体动力学原理设计的固定式尾翼、水平安定面或垂直安定面。</span>
          </li>
          <li className="bg-blue-900/20 p-6 rounded-lg border-l-8 border-cyan-500">
            <strong className="block text-yellow-400 text-3xl mb-2">主动控制 (活动水翼)</strong>
            <span className="text-gray-300 text-2xl">可偏转的舵面（如水平舵、垂直舵）。</span>
          </li>
          <li className="bg-blue-900/20 p-6 rounded-lg border-l-8 border-cyan-500">
            <strong className="block text-yellow-400 text-3xl mb-2">主动控制 (螺旋浆推进器)</strong>
            <span className="text-gray-300 text-2xl">直接安装在拖体上的动力推进装置。在低速拖曳、转向或需要悬停作业时提供主动推力。</span>
          </li>
        </ul>
      </div>
    ),
    transform: { x: -1000, y: 2500, z: 1000, rotateX: 0, rotateY: 45, rotateZ: 0 }
  },
  {
    id: 'control-3',
    type: 'content',
    title: '水下控制手段 (3/3)',
    content: (
      <div>
        <h3 className="text-4xl font-bold text-cyan-400 mb-6">二级深拖系统</h3>
        <p className="text-3xl leading-relaxed text-gray-200 mb-8">
          采用 <span className="text-yellow-400">“母船—主缆—沉耦器—次缆—拖体”</span> 的独特连接模式。
        </p>
        <div className="grid grid-cols-2 gap-8">
          <div className="bg-black/40 p-6 rounded-xl border border-blue-500">
            <h4 className="font-bold text-cyan-300 text-3xl mb-2">沉耦器</h4>
            <p className="text-xl text-gray-400">将主缆压入深海并吸收母船的高频升沉干扰。</p>
          </div>
          <div className="bg-black/40 p-6 rounded-xl border border-blue-500">
            <h4 className="font-bold text-cyan-300 text-3xl mb-2">次缆</h4>
            <p className="text-xl text-gray-400">呈悬链线状，物理隔离机械振动，使拖体获得极高的姿态稳定性。</p>
          </div>
        </div>
      </div>
    ),
    transform: { x: -2500, y: 3000, z: 0, rotateX: 45, rotateY: 0, rotateZ: 0 }
  },
  {
    id: 'kalman-intro',
    type: 'content',
    title: '软件实现：Kalman Filter',
    content: (
      <div>
        <h3 className="text-4xl font-bold text-cyan-400 mb-6">算法原理</h3>
        <p className="mb-6 text-gray-300 text-3xl">用途: 融合不同传感器数据, 降低单个传感器的误差。</p>
        <ul className="list-disc pl-8 space-y-4 text-gray-300 text-3xl">
          <li>我们试图预测变量 <MathDisplay latex="\mathbf{x}" />。</li>
          <li>通过计算动态更新的<strong>卡尔曼增益</strong>, 以一定权重融合传感器数据 <MathDisplay latex="\mathbf{c}" /> 与模型预测数据 <MathDisplay latex="A\mathbf{x}_{n-1}" />。</li>
          <li>使得最终预测期望方差<strong>比单独任一来源更小</strong>。</li>
          <li>对多个数据周期不同步的传感器, 常采用<strong>顺序式更新</strong>。</li>
        </ul>
      </div>
    ),
    transform: { x: 0, y: 4000, z: -1000, rotateX: 0, rotateY: 0, rotateZ: 0 }
  },
  {
    id: 'kalman-formulas',
    type: 'code',
    title: 'Kalman Filter 算法表达',
    content: (
      <div className="space-y-10 text-2xl">
        <div className="bg-gray-900/80 p-8 rounded-xl border border-cyan-500/50">
          <h4 className="text-3xl font-bold text-yellow-500 mb-4">模型预测 (Predict)</h4>
          <MathDisplay block latex="x_k' = Ax_{k-1} + Bu_{k-1}" />
          <MathDisplay block latex="P_k' = AP_{k-1}A^T + Q" />
        </div>
        <div className="bg-gray-900/80 p-8 rounded-xl border border-green-500/50">
          <h4 className="text-3xl font-bold text-yellow-500 mb-4">融合观测 (Update)</h4>
          <MathDisplay block latex="K_k = P_k'H^T(HP_k'H^T+R)^{-1}" />
          <MathDisplay block latex="x_k = x_k' + K_k(c_k - Hx_k')" />
          <MathDisplay block latex="P_k = (I - K_kH)P_k'" />
        </div>
      </div>
    ),
    transform: { x: 0, y: 4000, z: -3000, rotateX: 0, rotateY: 0, rotateZ: 0 }
  },
  {
    id: 'ekf',
    type: 'code',
    title: 'Extended Kalman Filter (EKF)',
    content: (
      <div>
        <p className="text-4xl text-yellow-400 mb-10 text-center">解决非线性状态转移的问题</p>
        <div className="space-y-10">
          <div className="text-center text-3xl">
            <p className="text-gray-300 mb-4">使用非线性的函数进行转移和观测:</p>
            <MathDisplay block latex="\begin{aligned} x_k &= f(x_{k-1}) \\ c &= h(x) \end{aligned}" />
          </div>
          <div className="bg-red-900/30 p-6 rounded-xl border border-red-500/50 text-2xl">
            <p className="text-gray-200 leading-relaxed">
              原 <MathDisplay latex="H" /> 和 <MathDisplay latex="A" /> 在计算卡尔曼增益和协方差时替换为 <MathDisplay latex="h" /> 和 <MathDisplay latex="f" /> 的<strong>一阶展开 (Jacobian矩阵)</strong>。
            </p>
          </div>
        </div>
      </div>
    ),
    transform: { x: 2000, y: 4000, z: -2000, rotateX: 0, rotateY: -90, rotateZ: 0 }
  },
  {
    id: 'adaptive-kf',
    type: 'code',
    title: 'Adaptive Kalman Filter',
    content: (
      <div>
        <p className="text-4xl text-yellow-400 mb-8">根据残差 (观测值与理应观测值) 动态调整 <MathDisplay latex="R" /></p>
        <div className="bg-purple-900/30 p-10 rounded-xl border border-purple-500/50 text-3xl">
          <MathDisplay block latex="v_k = z_k - H x'" />
          <MathDisplay block latex="R_k \approx (1-d)R_{k-1} + d \cdot (v_k v_k^T - H P' H^T)" />
        </div>
      </div>
    ),
    transform: { x: -2000, y: 4500, z: -2000, rotateX: 0, rotateY: 90, rotateZ: 0 }
  },
  {
    id: 'control-algo',
    type: 'content',
    title: 'Control Algorithm',
    content: (
      <div className="grid grid-cols-2 gap-8">
        <div className="bg-blue-800/20 p-6 rounded border border-blue-400/30">
          <h4 className="text-3xl font-bold text-cyan-300 mb-2">PID</h4>
          <p className="text-xl text-gray-400">Proportional, Integral, Derivative</p>
        </div>
        <div className="bg-blue-800/20 p-6 rounded border border-blue-400/30">
          <h4 className="text-3xl font-bold text-cyan-300 mb-2">自适应 PID</h4>
          <p className="text-xl text-gray-400">动态更新参数，可结合AI</p>
        </div>
        <div className="bg-blue-800/20 p-6 rounded border border-blue-400/30 col-span-2">
          <h4 className="text-3xl font-bold text-cyan-300 mb-2">滑模控制 (SMC)</h4>
          <p className="text-xl text-gray-400">把控制目标从直接控制到目标，改为控制到一个趋近于目标的滑模面。</p>
        </div>
        <div className="col-span-2 text-center text-yellow-400 font-bold text-4xl mt-6 animate-pulse">
          以及你可以在所有地方看到强化学习和人工智能
        </div>
      </div>
    ),
    transform: { x: 0, y: 5500, z: 0, rotateX: 60, rotateY: 0, rotateZ: 0 }
  },
  {
    id: 'icp',
    type: 'content',
    title: 'Point Cloud Matching',
    subtitle: 'Iterative Closest Point',
    content: (
      <div className="flex flex-col items-center justify-center h-full">
        <h3 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">ICP</h3>
        <p className="text-4xl mt-6 text-gray-300">Iterative Closest Point</p>
        <p className="mt-12 text-gray-400 text-center max-w-3xl text-3xl leading-relaxed">
          通过迭代计算最小化两个点云之间的距离误差，从而实现刚体变换的估计。
        </p>
      </div>
    ),
    transform: { x: -1500, y: 6500, z: 1500, rotateX: 0, rotateY: 0, rotateZ: 45 }
  },
  {
    id: 'ndt',
    type: 'content',
    title: 'Point Cloud Matching',
    subtitle: 'Normal Distributions Transform',
    content: (
      <div className="flex flex-col items-center justify-center h-full">
        <h3 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">NDT</h3>
        <p className="text-4xl mt-6 text-gray-300">Normal Distributions Transform</p>
        <p className="mt-12 text-gray-400 text-center max-w-3xl text-3xl leading-relaxed">
          将点云建模为概率密度函数（PDF），通过优化概率分布的匹配程度来进行配准。
        </p>
      </div>
    ),
    transform: { x: 1500, y: 6500, z: 1500, rotateX: 0, rotateY: 0, rotateZ: -45 }
  },
  {
    id: 'end',
    type: 'end',
    title: 'THANKS',
    content: (
      <div className="text-center">
        <p className="text-4xl text-cyan-300 mt-8">Deep Sea Towed System</p>
        <div className="mt-16 text-gray-500 text-2xl">Created with React, Framer Motion & Tailwind</div>
      </div>
    ),
    transform: { x: 0, y: 8000, z: 5000, rotateX: 0, rotateY: 0, rotateZ: 0 }
  }
];
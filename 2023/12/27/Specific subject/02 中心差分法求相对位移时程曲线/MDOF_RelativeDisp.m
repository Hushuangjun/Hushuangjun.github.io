%{
**************************************************
                     计算弹性体系相对位移时程曲线
**************************************************
  说明：
  本程序用中心差分法求解在给定地震动作用下的结构体系的相对位移时程曲线。
  本程序调用子函数MDOF_CentralDifference（中心差分法）进行时程分析。
  单位采用国际单位制(t,mm,s,N)。
%}
clear
clc

%% 结构基本信息
M = diag([120, 120, 120, 120, 120, 120, 120, 110]);  %质量矩阵
k = [300, 260, 260, 260, 200, 200, 200, 200]*1000 ; %各层层间刚度
K = zeros(8,8);
for i = 1:7       %层剪切模型的刚度矩阵
    K(i,i) = k(i) + k(i+1);
    K(i+1,i) = -k(i+1);
    K(i,i+1) = -k(i+1);
end
K(8,8) = k(8);
C = 0.6296*M + 0.003075*K;  %阻尼矩阵，采用瑞利阻尼，系数由前两阶振型的频率确定
xi = 0.05;  %各阶振型的阻尼比

clear i  %删除中间变量

%% 地震记录输入、处理、绘制时程曲线
a=textread('ElCentro.txt');  % 先将地震动加速度记录存放在a中，用于下面的处理
[i,j]=size(a);                   % 地震数组维数
RecordLength=i*j;               % 记录步数
A=zeros(RecordLength,2);        % 定义处理后的地震动加速度时程数组，有两列，第一列存放时间，第二列存放对应地震动加速度值
A(1:RecordLength,1)= 0:0.01:(RecordLength-1)*0.01;  % 在A中输出时间变量,式中的0.01为记录间隔
for n1 = 1:1:i                                           % 用双重for循环将a中的记录按顺序放入A中
    for n2=1:1:j
        A((n1-1)*j+n2,2)=a(n1,n2)*9.8*1000;     % g(9.8 m/s2) 转化为 mm/s2
    end
end
figure                                 % 打开一个绘图窗口
plot(A(:,1),A(:,2)) ;                  % 绘制地震动加速度时程曲线
title('GroundMotion')                  % 图形标题
xlabel('time (s)')                     % 图形x坐标
ylabel('Ground Acceleration (m/s^2)')  % 图形y坐标

clear i j n1 n2 a                      % 删除中间变量


%% 定义地震动等效动力荷载矩阵
onevector = ones(size(M,2),1);
P = zeros(size(M,1),RecordLength);
for i = 1:RecordLength
    P(:,i) = -(M*onevector).*A(i,2);
end

%% 调用子函数MDOF_CentralDifference
x0=zeros(8,1);    % 相对运动的初位移(数值积分用)
v0=zeros(8,1);    % 相对运动的初速度(数值积分用)
dt = 0.01;  %数值步长(=地震动记录间隔)
[x,v,a] = MDOF_CentralDifference(M,K,C,P,x0,v0,dt,RecordLength);

%% 绘制相对位移时程曲线
figure
layer_num = 1;
plot(A(:,1),x(layer_num,:).')       %绘制第 layer_num 层的相对位移时程曲线
title(['Time-history curve of relative displacement for Layer ', num2str(layer_num)])   % 图形标题
xlabel('time (s)')                     % 图形x坐标
ylabel('relative displacement (mm)')  % 图形y坐标


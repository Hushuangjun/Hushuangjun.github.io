function [x, v, a] = MDOF_CentralDifference(m, k, c, P, x0, v0, dt, n)
    x = zeros(size(m,1), n);  % 位移
    v = zeros(size(m,1), n);  % 速度
    a = zeros(size(m,1), n);  % 加速度

    x(:, 1) = x0;  % 设置初始位移
    v(:, 1) = v0;  % 设置初始速度
    a(:, 1) = m\(P(:, 1) - c * v(:, 1) - k * x(:, 1));  % 计算初始加速度

    x_1 = x(:, 1) - dt .* v(:, 1) + dt^2 / 2 .* a(:, 1);  % 计算 X_(-1)
    P_eq = zeros(size(m));  % 初始化等效力

    k_eq = m ./ dt^2 + c ./ (2 * dt);  % 有效弹簧系数
    b1 = m ./ dt^2 - c ./ (2 * dt);  % 一阶阻尼项系数
    b2 = k - 2 .* (m ./ dt^2);  % 二阶质量项系数

    P_eq(:, 1) = P(:, 1) - b1 * x_1 - b2 * x(:, 1);  % 计算第一步的等效力
    x(:, 2) = k_eq\P_eq(:, 1) ;  % 计算第二步的位移

    for i = 2:n-1
        P_eq(:, i) = P(:, i) - b1 * x(:, i-1) - b2 * x(:, i);  % 计算等效力
        x(:, i+1) = k_eq\P_eq(:, i);  % 计算位移
        v(:, i) = (x(:, i+1) - x(:, i-1)) ./ (2 * dt);  % 计算速度
        a(:, i) = (x(:, i+1) - 2 * x(:, i) + x(:, i-1)) ./ dt^2;  % 计算加速度
    end

    P_eq(:, n) = P(:, n) - b1 * x(:, n-1) - b2 * x(:, n);
    xx = k_eq\P_eq(:, n);
    v(:, n) = (xx - x(:, n-1)) ./ (2 * dt);  % 计算最后一步的速度
    a(:, n) = (xx - 2 * x(:, n) + x(:, n-1)) ./ dt^2;  % 计算最后一步的加速度
end
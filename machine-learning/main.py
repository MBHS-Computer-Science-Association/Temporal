# import neurolab as nl
# import numpy as np
#
# # Create train samples
# x = np.linspace(-7, 7, 20)
# y = np.sin(x) * 0.5
#
# size = len(x)
#
# inp = x.reshape(size,1)
# tar = y.reshape(size,1)
#
# net = nl.net.newff([[-1.0, 1.0],[-1.0, 1.0],[-1.0, 1.0]], [3, 1])
#
# net.train_gd(inp, tar, epochs-500, show=100, goal=0.02);
#
# out = net.sim(inp)
print("hello world")

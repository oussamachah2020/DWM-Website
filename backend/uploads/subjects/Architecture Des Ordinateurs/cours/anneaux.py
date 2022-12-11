from tkinter import *

fen = Tk()

canva1 = Canvas(fen, width=500, height=400)
canva1.pack()

def tracerC1():
    canva1.create_oval(20, 20, 120, 120, outline="red")
def tracerC2():
    canva1.create_oval(120, 20, 220, 120, outline="yellow")
def tracerC3():
    canva1.create_oval(220, 20, 320, 120, outline="green")
def tracerC4():
    canva1.create_oval(70, 70, 170, 170, outline="blue")
def tracerC5():
    canva1.create_oval(170, 70, 270, 170, outline="black")

c1Btn = Button(fen,text="C1", command=tracerC1)
c1Btn.pack(side=LEFT)

c1Btn = Button(fen,text="C2", command=tracerC2)
c1Btn.pack(side=LEFT)

c1Btn = Button(fen,text="C3", command=tracerC3)
c1Btn.pack(side=LEFT)

c1Btn = Button(fen,text="C4", command=tracerC4)
c1Btn.pack(side=LEFT)

c1Btn = Button(fen,text="C5", command=tracerC5)
c1Btn.pack(side=LEFT)

quitBtn = Button(fen, text="Quitter", command=fen.quit)
quitBtn.pack(side=RIGHT)
fen.mainloop()
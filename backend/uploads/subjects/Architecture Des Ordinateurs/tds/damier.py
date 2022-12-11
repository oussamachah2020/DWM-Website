from random import randrange
from tkinter import *

fen = Tk()

canva1 = Canvas(fen, width=400, height=400, background="white")
canva1.pack()

SIZE = 40
def showDamier():
    for x in range(10):
        for y in range(10):
            if (x+y)%2 == 0:
                canva1.create_rectangle(x*SIZE, y*SIZE,(x+1)*SIZE,(y+1)*SIZE, fill="blue")
            
                


def showPions():
    x = randrange(0, 400, 40)
    y = randrange(0, 400, 40)
    canva1.create_oval(x, y, x+SIZE, y+SIZE, fill="red")

btn1 = Button(fen, text="damier", command=showDamier)
btn1.pack(side=LEFT)

btn1 = Button(fen, text="pions", command=showPions)
btn1.pack(side=RIGHT)

fen.mainloop()
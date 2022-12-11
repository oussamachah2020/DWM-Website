from tkinter import *

fen = Tk()
canva1 = Canvas(fen, width=300, height=300)
canva1.pack()
canva1.create_rectangle(30, 0, 270, 300, fill="gray")
# changer le couleur on clic
colors = ["green", "red"]
clr1, clr2 = colors[0], colors[1]
def changerCouleur():
        global clr1, clr2
        canva1.itemconfig(greenCercle1, fill=clr2)
        canva1.itemconfig(greenCercle2, fill=clr2)
    
        canva1.itemconfig(redCercle1, fill=clr1)
        canva1.itemconfig(redCercle2, fill=clr1)
        if clr1 == "green":  
            clr1, clr2 = colors[1], colors[0]
        else:
            clr1, clr2 = colors[0], colors[1]
i = 0
x= 30
while i<7:
    canva1.create_rectangle(x, 100, x+30, 200, fill="yellow")
    x = x+35
    i += 1
greenCercle1 = canva1.create_oval(8, 80, 28, 100, fill="green")    
redCercle1 = canva1.create_oval(272, 80, 292, 100, fill="red")

redCercle2 = canva1.create_oval(8, 200, 28, 220, fill="red")    
greenCercle2 = canva1.create_oval(272, 200, 292, 220, fill="green")    

btn = Button(fen, text="Changer", command=changerCouleur)
btn.pack(side=RIGHT)

fen.mainloop()
from tkinter import *
win = Tk()
win.title('Exercice 5')
def dessin1():
    can1.delete(ALL)
    can1.create_line(100,0, 100, 200, fill ='blue')
    can1.create_line(0, 100, 200, 100, fill ='blue')
    r = 15
    while r<100:
        can1.create_oval(100+r,100+r,100-r,100-r,outline='black')
        r+=15
def cercle(x, y, r, coul ='black'):
    can1.create_oval(x-r, y-r, x+r, y+r, outline=coul)
def dessin2():
    can1.delete(ALL)
    can1.create_oval(185,185,15,15,outline='yellow')
    list_circle = [[100, 100, 80, 'red'],
                    [70, 70, 15, 'blue'],
                    [130, 70, 15, 'blue'],
                    [70, 70, 5, 'black'],
                    [130, 70, 5, 'black'],
                    [44, 115, 20, 'red'],
                    [156, 115, 20, 'red'],
                    [100, 95, 15, 'purple'],
                    [100, 145, 30, 'purple']]
    i =0
    while i < len(list_circle):
        ci = list_circle[i]
        cercle(ci[0], ci[1], ci[2], ci[3])
        i += 1
can1 = Canvas(win,width=200,height=200,bg='silver')
can1.pack()
dessin1 =Button(win,text='dessin1',command=dessin1).pack(side='right')
dessin2 =Button(win,text='dessin2',command=dessin2).pack(side='left')
exit  =Button(win,text='Quitter',command=win.quit).pack(side='bottom')
win.mainloop()

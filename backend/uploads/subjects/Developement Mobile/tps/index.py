from tkinter import *

fen = Tk()
fen.title("Doubler un nombre")

def calculer():
    n = int(input1.get())
    print(n)
    # input2.config(text=str(n*2))
    # input2.insert(0,END)
    input2.insert(0,str(n*2))
    

l1 = Label(fen,anchor='w', text="Saisir un nombre entier")
l1.grid(column=0, sticky="NSWE", row=0, padx=10)


l1 = Label(fen,anchor='w', text="Le double N est:")
l1.grid(column=0, sticky="NSWE", row=1, padx=10)

input1 = Entry(fen, highlightbackground = "green", highlightcolor= "green", highlightthickness=2)
input1.grid(column=1, row=0, padx=20)

input2 = Entry(fen,  highlightbackground = "blue", highlightcolor= "blue", highlightthickness=2)
input2.grid(column=1, row=1,  padx=20, pady=10)


calcBtn = Button(fen, text="Calculer" , command=calculer, background="green")
calcBtn.grid(column=1, sticky="NSWE" , row=2, pady=15,  padx=20)
quitBtn = Button(fen, text="Quitter" , command=fen.quit, background="red")
quitBtn.grid(column=1, sticky="NSWE" , row=3, pady=25,  padx=20)


fen.mainloop()
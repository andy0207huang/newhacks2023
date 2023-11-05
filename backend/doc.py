import os

from PyPDF2 import PdfReader


def getDoc(file):
        
    text = ""

    pdf = PdfReader(file)    
    for page in pdf.pages:
            text += page.extract_text()

    text = text.replace("\n", "")

    return text

if __name__ == "__main__":

    with open('./test/Team_Presentation_Overview_Slides.pdf', 'rb') as f:
            text = getDoc(f)

            f.close()


    with open('./test/test.txt', 'w') as f:
            f.write(text)
            f.close()

    # with open('./test/Lab 3 - Multi-threaded Socket Programming.pdf', 'rb') as f:

    #         text = getDoc(f)

    #         f.close()

    
    # with open('./test/test.txt', 'w') as f:
    #         f.write(text)
    #         f.close()

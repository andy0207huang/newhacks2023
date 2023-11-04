import os

from PyPDF2 import PdfReader
from textract import process
from docx import Document

def getDoc(path):
    
    fileExtension = os.path.splitext(path)[1]
    
    text = ""

    if fileExtension == '.pdf':

        with open(path, 'rb') as f:
            pdf = PdfReader(f)    
            for page in pdf.pages:
                text += page.extract_text()


        with open('backend/test/test.txt', 'w') as f:
            f.write(text)
            f.close()

    elif 'doc' in fileExtension:
        f = open(path, 'rb')
        


if __name__ == "__main__":
    getDoc('backend/test/Team_Presentation_Overview_Slides.pdf')
    getDoc('backend/test/Lab 3 - Multi-threaded Socket Programming.pdf')
    getDoc('backend/test/CalculatorStatechartToSourceCode2.docx')
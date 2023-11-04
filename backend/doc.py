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

            return text
        

    elif 'doc' in fileExtension:
        f = open(path, 'rb')
        
        return text

if __name__ == "__main__":
    text = getDoc('backend/test/Team_Presentation_Overview_Slides.pdf')

    with open('backend/test/test.txt', 'w') as f:
            f.write(text)
            f.close()

    text = getDoc('backend/test/Lab 3 - Multi-threaded Socket Programming.pdf')

    with open('backend/test/test.txt', 'w') as f:
            f.write(text)
            f.close()

    text = getDoc('backend/test/CalculatorStatechartToSourceCode2.docx')

    with open('backend/test/test.txt', 'w') as f:
            f.write(text)
            f.close()
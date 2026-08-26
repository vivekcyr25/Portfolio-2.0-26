import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
from reportlab.lib.units import inch

def generate_resume(output_path):
    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        leftMargin=0.45 * inch,
        rightMargin=0.45 * inch,
        topMargin=0.4 * inch,
        bottomMargin=0.4 * inch,
    )

    styles = getSampleStyleSheet()
    
    # Custom styles
    primary_color = colors.HexColor("#1A1A24")
    accent_blue = colors.HexColor("#0D47A1")
    text_dark = colors.HexColor("#1F2937")
    gray_subtle = colors.HexColor("#4B5563")
    divider_color = colors.HexColor("#9CA3AF")

    name_style = ParagraphStyle(
        'NameStyle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=19,
        leading=22,
        textColor=primary_color,
    )

    contact_style = ParagraphStyle(
        'ContactStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11.5,
        textColor=text_dark,
    )

    section_header_style = ParagraphStyle(
        'SectionHeader',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=12,
        textColor=primary_color,
        spaceAfter=2,
    )

    body_style = ParagraphStyle(
        'BodyTextCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11,
        textColor=text_dark,
    )

    bullet_style = ParagraphStyle(
        'BulletCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.2,
        leading=10.5,
        leftIndent=12,
        firstLineIndent=-8,
        textColor=text_dark,
    )

    tech_style = ParagraphStyle(
        'TechCustom',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=7.8,
        leading=10,
        textColor=colors.HexColor("#374151"),
    )

    story = []

    # 1. Header (Name & Contact Info)
    name_p = Paragraph("<b>Vivek Sharma</b>", name_style)
    
    contact_left = Paragraph(
        'LinkedIn: <a href="https://www.linkedin.com/in/vivek-sharma-2bba8b398/" color="#0D47A1"><u>linkedin.com/in/vivek-sharma-2bba8b398</u></a><br/>'
        'GitHub: <a href="https://github.com/vivekcyr25" color="#0D47A1"><u>github.com/vivekcyr25</u></a>',
        contact_style
    )
    
    contact_right = Paragraph(
        'Email: <a href="mailto:viveklpu008@gmail.com" color="#0D47A1"><u>viveklpu008@gmail.com</u></a><br/>'
        'Mobile: +91-6230533596',
        ParagraphStyle('RightContact', parent=contact_style, alignment=2)
    )

    header_table = Table([[name_p, ""], [contact_left, contact_right]], colWidths=[4.2*inch, 3.1*inch])
    header_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('SPAN', (0,0), (1,0)),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2),
    ]))
    story.append(header_table)
    story.append(Spacer(1, 4))

    # Helper for Section Divider
    def add_section_header(title):
        story.append(Paragraph(f"<b>{title.upper()}</b>", section_header_style))
        story.append(HRFlowable(width="100%", thickness=0.75, color=divider_color, spaceBefore=1, spaceAfter=4))

    # 2. SKILLS
    add_section_header("SKILLS")
    skills_data = [
        "<b>• Programming Languages:</b> C++, Java, JavaScript, PHP",
        "<b>• Core Concepts:</b> Data Structures & Algorithms (DSA), Object-Oriented Programming (OOP), DBMS",
        "<b>• Frontend:</b> React.js, HTML5, CSS3, Tailwind CSS",
        "<b>• Backend:</b> Node.js, Express.js, Laravel, REST APIs, MVC Architecture, JWT Authentication, JSON",
        "<b>• Databases:</b> MySQL, MongoDB, Database Design, Query Optimization",
        "<b>• Tools:</b> Git, GitHub, Docker, Postman, VS Code, XAMPP",
        "<b>• Soft Skills:</b> Problem-Solving, Team Collaboration, Time Management, Agile Development"
    ]
    for s in skills_data:
        story.append(Paragraph(s, body_style))
        story.append(Spacer(1, 1.2))
    story.append(Spacer(1, 4))

    # 3. INTERNSHIP EXPERIENCE
    add_section_header("INTERNSHIP EXPERIENCE")
    exp_header = Table([
        [Paragraph("<b>Full Stack Development Intern</b> | <i>Flyrank AI</i>", body_style),
         Paragraph("July 2026 – August 2026", ParagraphStyle('ExpDate', parent=body_style, alignment=2))]
    ], colWidths=[5.2*inch, 2.1*inch])
    exp_header.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2),
    ]))
    story.append(exp_header)
    story.append(Paragraph("• Audited and mapped 14 recurring development, academic, and project workflows to identify opportunities for AI collaboration, delegation, and automation.", bullet_style))
    story.append(Spacer(1, 1.5))
    story.append(Paragraph("• Designed a structured AI-assisted engineering workflow covering coding, debugging, documentation, testing, and technical decision-making with human-review checkpoints.", bullet_style))
    story.append(Spacer(1, 1.5))
    story.append(Paragraph("• Performed database design, debugging, testing, and application performance optimization, reducing response time by 20%.", bullet_style))
    story.append(Spacer(1, 4))

    # 4. PROJECTS
    add_section_header("PROJECTS")
    
    # Project 1: AIPS
    p1_header = Table([
        [Paragraph('<b>AIPS</b> | <a href="https://github.com/vivekcyr25/APIS-Academic-Intelligence-System" color="#0D47A1"><u>Github</u></a> | <a href="https://vivekcyr25.github.io/APIS-Academic-Intelligence-System/" color="#0D47A1"><u>Live</u></a>', body_style),
         Paragraph("Dec 2025", ParagraphStyle('P1Date', parent=body_style, alignment=2))]
    ], colWidths=[5.2*inch, 2.1*inch])
    p1_header.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2),
    ]))
    story.append(p1_header)
    story.append(Paragraph("• Built an AI-powered portfolio platform to present projects, technical skills, experience, and achievements through an interactive web interface.", bullet_style))
    story.append(Spacer(1, 1.5))
    story.append(Paragraph("• Implemented project-focused sections to showcase software development, AI/ML, frontend, and automation work in a structured format.", bullet_style))
    story.append(Spacer(1, 1.5))
    story.append(Paragraph("• Implemented personal AI chatbot for guidance in AI-based tracking using Gemini API.", bullet_style))
    story.append(Spacer(1, 1.5))
    story.append(Paragraph("<b>Tech Stack:</b> React.js, JavaScript, Tailwind CSS, Node.js, Firebase, Gemini API, Git/GitHub", tech_style))
    story.append(Spacer(1, 4))

    # Project 2: AI Video Restoration
    p2_header = Table([
        [Paragraph('<b>AI VIDEO RESTORATION PIPELINE</b> | <a href="https://github.com/vivekcyr25/AI-Video-Restoration-Pipeline" color="#0D47A1"><u>Github</u></a> | <a href="https://github.com/vivekcyr25" color="#0D47A1"><u>Live</u></a>', body_style),
         Paragraph("June 2026", ParagraphStyle('P2Date', parent=body_style, alignment=2))]
    ], colWidths=[5.2*inch, 2.1*inch])
    p2_header.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2),
    ]))
    story.append(p2_header)
    story.append(Paragraph("• Developed an end-to-end AI-powered video restoration pipeline for recovering and enhancing old CD media using album photographs as visual references.", bullet_style))
    story.append(Spacer(1, 1.5))
    story.append(Paragraph("• Implemented scene detection and representative-frame extraction to divide long videos into manageable shots and identify key frames for restoration.", bullet_style))
    story.append(Spacer(1, 1.5))
    story.append(Paragraph("• Integrated super-resolution, de-noising networks, and robust model checkpoints for multi-stage video enhancement.", bullet_style))
    story.append(Spacer(1, 1.5))
    story.append(Paragraph("<b>Tech:</b> Python · PyTorch · Torchvision · OpenCLIP · Real-ESRGAN · InsightFace · ONNX Runtime · FFmpeg · PySceneDetect · NumPy · OpenCV · Git/GitHub", tech_style))
    story.append(Spacer(1, 4))

    # 5. TECHNICAL TRAINING & CERTIFICATES
    add_section_header("TECHNICAL TRAINING & CERTIFICATES")
    certs = [
        ("• Mastering DevOps | Infosys Springboard", "Jan 2026"),
        ("• Full Stack Development | Infosys Springboard", "Mar 2026"),
        ("• Claude 101 | Anthropic", "Jun 2026"),
        ("• Introduction to Generative AI | Google", "Apr 2026"),
    ]
    for c_text, c_date in certs:
        row = Table([
            [Paragraph(c_text, body_style),
             Paragraph(c_date, ParagraphStyle('CDate', parent=body_style, alignment=2))]
        ], colWidths=[5.4*inch, 1.9*inch])
        row.setStyle(TableStyle([
            ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
            ('LEFTPADDING', (0,0), (-1,-1), 0),
            ('RIGHTPADDING', (0,0), (-1,-1), 0),
            ('TOPPADDING', (0,0), (-1,-1), 0),
            ('BOTTOMPADDING', (0,0), (-1,-1), 1),
        ]))
        story.append(row)
    story.append(Spacer(1, 4))

    # 6. EDUCATION
    add_section_header("EDUCATION")
    
    edu1 = Table([
        [Paragraph("<b>Lovely Professional University</b>", body_style),
         Paragraph("Punjab, India", ParagraphStyle('EduLoc1', parent=body_style, alignment=2))],
        [Paragraph("<i>Bachelor of Technology in Computer Science and Engineering</i>", body_style),
         Paragraph("Aug 2025 – Present", ParagraphStyle('EduDate1', parent=body_style, alignment=2))]
    ], colWidths=[5.2*inch, 2.1*inch])
    edu1.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
    ]))
    story.append(edu1)
    story.append(Spacer(1, 3))

    edu2 = Table([
        [Paragraph("<b>DAV Public School</b>", body_style),
         Paragraph("Kangra, H.P.", ParagraphStyle('EduLoc2', parent=body_style, alignment=2))],
        [Paragraph("Matriculation | Percentage: 74%", body_style),
         Paragraph("March 2024-25", ParagraphStyle('EduDate2', parent=body_style, alignment=2))]
    ], colWidths=[5.2*inch, 2.1*inch])
    edu2.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
    ]))
    story.append(edu2)

    # Build PDF
    doc.build(story)
    print(f"Generated PDF at: {output_path}")

if __name__ == '__main__':
    public_dir = os.path.join(os.path.dirname(__file__), 'public')
    os.makedirs(public_dir, exist_ok=True)
    generate_resume(os.path.join(public_dir, 'Vivek_Sharma_CV.pdf'))
    generate_resume(os.path.join(public_dir, 'resume.pdf'))

from flask import Flask, render_template, request, redirect, flash
import os
import smtplib

app = Flask(__name__)
app.secret_key = "your_secret_key"  # Needed for flash messages

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/send_email/', methods=['POST'])
def send_email():
    # Get form data
    name = request.form.get('name', '').strip()
    email = request.form.get('email', '').strip()
    cashew_type = request.form.get('cashewType', '').strip()
    quantity = request.form.get('quantity', '').strip()
    order_details = request.form.get('orderDetails', '').strip()

    # Validate form inputs
    if not name or not email or not cashew_type or not quantity:
        flash("All fields are required!")
        return redirect('/')

    # Read email credentials securely
    gmail_sender = os.getenv("GMAIL_SENDER")
    gmail_password = os.getenv("GMAIL_PASSWORD")
    if not gmail_sender or not gmail_password:
        flash("Email configuration is missing. Please contact support.")
        return redirect('/')

    # Prepare the email
    subject = f"New Order from {name}"
    body = f"""
    Name: {name}
    Email: {email}
    Cashew Type: {cashew_type}
    Quantity: {quantity} kg
    Details: {order_details}
    """
    message = f"Subject: {subject}\n\n{body}"

    try:
        # Send the email
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(gmail_sender, gmail_password)
        server.sendmail(gmail_sender, gmail_sender, message)
        server.quit()
        flash("Your order has been submitted successfully!")
    except Exception as e:
        flash(f"Error sending email: {e}")

    return redirect('/')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000,debug=True)

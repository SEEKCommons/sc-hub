class EnrollmentMailer < ApplicationMailer
  def introduce_case(enrollment)
    @case = enrollment.case
    @reader = enrollment.reader

    @token = @reader.send(:set_reset_password_token)  if @reader.sign_in_count === 0

    mail to: enrollment.reader.name_and_email,
      subject: "You’ve been enrolled in a new Michigan Sustainability Case"
  end
end

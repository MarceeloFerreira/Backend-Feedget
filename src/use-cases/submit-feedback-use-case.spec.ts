import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
    { create: createFeedbackSpy },
    { sendMail: sendMailSpy }
)

describe('Submit feedback', () => {
    it('should be able to submit a feedback', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'Example Comment',
            screenshot: 'data:image/png;base64,test'
        })).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    });

    it('Should not be able to submit feedback without a type', async () => {
        await expect(submitFeedback.execute({
            type: '',
            comment: 'Example Comment',
            screenshot: 'data:image/png;base64,test'
        })).rejects.toThrow();
    });

    it('Should not be able to submit feedback without a comment', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: '',
            screenshot: 'data:image/png;base64,test'
        })).rejects.toThrow();
    });

    it('Should not be able to submit feedback without a invalid screenshot', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'Example Comment',
            screenshot: 'test.jpg'
        })).rejects.toThrow();
    });
});